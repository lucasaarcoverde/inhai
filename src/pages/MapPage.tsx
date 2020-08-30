import React from "react";
import { Map } from "../components/index";
import { Input } from "antd";

const { Search } = Input;

export function MapPage() {
  const [search, setSearch] = React.useState("");

  return (
    <div
      style={{
        height: "100%",
        position: "relative",
      }}
    >
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
        <Map location={search} />
      </div>
    </div>
  );
}
