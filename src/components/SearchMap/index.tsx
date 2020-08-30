import React from "react";
import { getPosition, getMarkerIcon } from "./utils";
import { Input } from "antd";

interface SearchMapProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

declare global {
  interface Window {
    H: any;
  }
}

const { Search } = Input;

/** @todo
 * improve search. Now is static in campina grande
 * */
export const SearchMap = React.memo(({ search, setSearch }: SearchMapProps) => {
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
    /* eslint-disable-next-line */
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    /* eslint-disable-next-line */
    var ui = H.ui.UI.createDefault(map, defaultLayers, "pt-BR");

    const markerIcon = new H.map.Icon(getMarkerIcon());
    const marker = new H.map.Marker(currentLocation, {
      icon: markerIcon,
    });

    map.addObject(marker);

    var service = platform.getSearchService();
    // Call the geocode method with the geocoding parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    if (search) {
      service.geocode(
        {
          q: `${search}, city=Campina Grande`,
          lang: "pt-BR",
          limit: 1,
          in: "countryCode:BRA",
        },
        (result: any) => {
          console.log(result);
          // Add a marker for each location found
          result.items.forEach((item: any) => {
            console.log(item.position);

            const marker = new H.map.Marker(item.position, {
              icon: markerIcon,
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
  }, [currentLocation, search]); // This will run this hook every time this ref is updated

  return (
    <>
      <span
        style={{
          display: "flex",
          position: "absolute",
          width: "100%",
          top: 20,
          zIndex: 99,
          justifyContent: "center",
        }}
      >
        <Search
          placeholder="Search..."
          onSearch={(value: string) => setSearch(value)}
          style={{
            width: "80%",
            maxWidth: 600,
          }}
        />
      </span>
      <div>
        <div
          ref={mapRef}
          style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
        />
      </div>
    </>
  );
});
