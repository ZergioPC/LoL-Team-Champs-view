import React from "react";
import { TEAM_TYPES } from "../constants";
import checkNoRepeatData from "../utils/checkNoRepeatData";

function useAddChamp({
  blueTeam,
  redTeam,
  setBlueChamp,
  setRedChamp,
  endpoints,
  showModal,
  setTeamLoading,
  stopLoading,
  resetSearch,
}) {
  const addChamp = React.useCallback(
    async (team, champId) => {
      if (!endpoints) return;

      const teamList = team === TEAM_TYPES.blue ? blueTeam : redTeam;

      if (teamList.length >= 5) {
        showModal("Solo 5 campeones por equipo");
        resetSearch();
        return;
      }

      if (checkNoRepeatData(champId, teamList)) {
        showModal("No se puede repetir campeón en un mismo equipo");
        resetSearch();
        return;
      }

      setTeamLoading(team);
      try {
        const res = await fetch(endpoints.champData + champId + ".json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const champ = data.data[champId];

        if (team === TEAM_TYPES.blue) {
          setBlueChamp(champ);
        } else {
          setRedChamp(champ);
        }
      } catch (e) {
        console.log("ERROR CHE: ", e);
        showModal("No se pudo cargar el campeón. Inténtalo de nuevo.");
      } finally {
        stopLoading();
        resetSearch();
      }
    },
    [
      blueTeam,
      redTeam,
      endpoints,
      setBlueChamp,
      setRedChamp,
      showModal,
      setTeamLoading,
      stopLoading,
      resetSearch,
    ]
  );

  return addChamp;
}

export default useAddChamp;
