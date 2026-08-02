import React from "react";

function useTeamsLogic() {
  const [blueTeam, setBlueTeam] = React.useState([]);
  const [redTeam, setRedTeam] = React.useState([]);

  const setBlueChamp = React.useCallback((newChamp) => {
    setBlueTeam((prev) => (prev.length >= 5 ? prev : [...prev, newChamp]));
  }, []);

  const rmBlueChamp = React.useCallback((id) => {
    setBlueTeam((prev) => prev.filter((champ) => champ.id !== id));
  }, []);

  const setRedChamp = React.useCallback((newChamp) => {
    setRedTeam((prev) => (prev.length >= 5 ? prev : [...prev, newChamp]));
  }, []);

  const rmRedChamp = React.useCallback((id) => {
    setRedTeam((prev) => prev.filter((champ) => champ.id !== id));
  }, []);

  return {
    blueTeam,
    redTeam,
    setBlueChamp,
    setRedChamp,
    rmBlueChamp,
    rmRedChamp,
  };
}

export default useTeamsLogic;
