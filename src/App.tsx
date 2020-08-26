import React from "react";
import { Map, SearchInput } from "./components/index";

export function App() {
  const [search, setSearch] = React.useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <SearchInput setSearch={setSearch} />
      <Map location={search} />
    </div>
  );
}
