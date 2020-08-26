import React from "react";
import { getLocation } from "./utils";

interface MapProps {
  location: string;
}

declare global {
  interface Window {
    H: any;
  }
}

export const Map = ({ location }: MapProps) => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);
  // const [currentLocation, setCurrentLocation] = React.useState({
  //   lat: 50,
  //   lng: 50,
  // });

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  React.useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    let currentLocation = { lat: -7.223895099999999, lng: -35.8825037 };
    getLocation((position: Position) => {
      currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_HERE_API_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: currentLocation,
      zoom: 16,
      pixelRatio: window.devicePixelRatio || 1,
    });
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    var service = platform.getSearchService();
    // Call the geocode method with the geocoding parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    if (location) {
      service.geocode(
        {
          q: `${location}, Campina Grande`,
        },
        (result: any) => {
          console.log(result);
          // Add a marker for each location found
          result.items.forEach((item: any) => {
            hMap.addObject(new H.map.Marker(item.position));
            hMap.setCenter(item.position);
          });
        },
        alert
      );
    }
    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [location, mapRef]); // This will run this hook every time this ref is updated

  return <div ref={mapRef} style={{ height: "500px", width: "500px" }} />;
};
