import React from "react";
import { getPosition, getMarkerIcon } from "./utils";

interface MapProps {
  location: string;
}

declare global {
  interface Window {
    H: any;
  }
}

export const Map = ({ location }: MapProps) => {
  const mapRef = React.useRef(null);

  const defaultLocation = {
    lat: -7.223895099999999,
    lng: -35.8825037,
  };
  const currentLocation = getPosition() ?? defaultLocation;

  React.useEffect(() => {
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_HERE_API_KEY,
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: currentLocation,
      zoom: 16,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    var ui = H.ui.UI.createDefault(map, defaultLayers, "pt-BR");

    const marker = new H.map.Marker(currentLocation, {
      icon: new H.map.Icon(getMarkerIcon()),
    });

    map.addObject(marker);

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
            console.log(item.position);

            const marker = new H.map.Marker(item.position, {
              icon: new H.map.Icon(getMarkerIcon()),
            });

            map.addObject(marker);
            map.setCenter(item.position);
          });
        },
        alert
      );
    }
    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      map.dispose();
    };
  }, [currentLocation, location, mapRef]); // This will run this hook every time this ref is updated

  return <div ref={mapRef} className="w-60" style={{ height: 500 }} />;
};
