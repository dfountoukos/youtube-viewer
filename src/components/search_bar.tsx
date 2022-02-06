import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { searchVideos } from "../redux/actions/videos";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const debouncedSearchVideos = _.debounce(
    (term: string) => dispatch(searchVideos(term)),
    300
  );
  const searchVideosCallback = useCallback(debouncedSearchVideos, [
    debouncedSearchVideos,
  ]);

  useEffect(() => {
    searchVideosCallback("liverpool");
  }, [searchVideosCallback]);

  return (
    <div className="search-bar">
      <input onChange={(event) => searchVideosCallback(event.target.value)} />
    </div>
  );
};

export default SearchBar;
