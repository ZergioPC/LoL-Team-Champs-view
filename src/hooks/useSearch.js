import React from "react";
import { TEAM_TYPES } from "../constants";

function useSearch() {
  const [search, setSearch] = React.useState({
    queryRed: "",
    queryBlue: "",
  });

  const setQuery = React.useCallback((team, value) => {
    setSearch((prev) => ({
      ...prev,
      ...(team === TEAM_TYPES.blue ? { queryBlue: value } : { queryRed: value }),
    }));
  }, []);

  const resetSearch = React.useCallback(() => {
    setSearch({ queryRed: "", queryBlue: "" });
  }, []);

  return { search, setQuery, resetSearch };
}

export default useSearch;
