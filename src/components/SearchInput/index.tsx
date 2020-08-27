import React from "react";
import { Input } from "antd";

interface SearchInputProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const { Search } = Input;

export function SearchInput({ setSearch }: SearchInputProps) {
  return (
    <span className="w-60 mb3">
      <Search
        placeholder="Search a place in Campina Grande..."
        onSearch={(value: string) => setSearch(value)}
        size="large"
        enterButton
      />
    </span>
  );
}
