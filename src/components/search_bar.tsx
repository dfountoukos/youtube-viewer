import React from "react";

interface SearchBarProps {
  onSearchTermChange: (term: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchTermChange }) => {
  return (
    <div className="search-bar">
      <input
        onChange={(event) => onSearchTermChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
