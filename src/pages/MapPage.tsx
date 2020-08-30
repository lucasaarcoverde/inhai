import React from "react";
import { SearchMap } from "../components/index";

export function MapPage() {
  const [search, setSearch] = React.useState("");

  return (
    <div
      style={{
        height: "100%",
        position: "relative",
      }}
    >
      <SearchMap search={search} setSearch={setSearch} />
    </div>
  );
}
