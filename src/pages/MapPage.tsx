import React from "react";
import { Map } from "../components/index";

/** @todo Improve map page with the search input within the map */
export function MapPage({ location }: { location: string }) {
  return <Map location={location} />;
}
