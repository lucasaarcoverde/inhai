import React from "react";
import { Input } from "antd";

interface SearchInputProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const { Search } = Input;

export function SearchInput({ setSearch }: SearchInputProps) {
  return (
    <Search
      style={{ width: "60%", marginBottom: "1em" }}
      placeholder="Search a place in Campina Grande..."
      onSearch={(value: string) => setSearch(value)}
      size="large"
      enterButton
    />
  );
}
