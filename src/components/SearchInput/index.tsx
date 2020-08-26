import React from "react";
import { Input } from "antd";
interface SearchInputProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export function SearchInput({ setSearch }: SearchInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <span style={{ display: "flex", justifyContent: "center", width: "500px" }}>
      <Input
        placeholder="Search..."
        style={{ margin: "1em", width: "80%" }}
        onChange={handleChange}
        onPressEnter={() => setSearch(inputValue)}
      />
    </span>
  );
}
