import React from "react";
import { TEAM_TYPES } from "../constants";

function useLoading() {
  const [loading, setLoading] = React.useState({
    [TEAM_TYPES.blue]: false,
    [TEAM_TYPES.red]: false,
  });

  const setTeamLoading = React.useCallback((team) => {
    setLoading((prev) => ({ ...prev, [team]: true }));
  }, []);

  const stopLoading = React.useCallback(() => {
    setLoading({
      [TEAM_TYPES.blue]: false,
      [TEAM_TYPES.red]: false,
    });
  }, []);

  return { loading, setTeamLoading, stopLoading };
}

export default useLoading;
