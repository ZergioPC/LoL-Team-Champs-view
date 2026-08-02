import React from "react";
import "./App.css";

import { Modal } from "./components/Modal";
import { TeamPanel } from "./components/TeamPanel";

import useApiEndpoints from "./hooks/useApiEndpoints";
import useGetChamps from "./hooks/useGetChamps";
import useTeamsLogic from "./hooks/useTeamsLogic";
import useModal from "./hooks/useModal";
import useLoading from "./hooks/useLoading";
import useSearch from "./hooks/useSearch";
import useAddChamp from "./hooks/useAddChamp";

import findChamps from "./utils/findChamps";
import { TEAM_TYPES } from "./constants";

function App() {
  const endpoints = useApiEndpoints();
  const {
    champs: champsInitList,
    loading: champsLoading,
    error: champsError,
  } = useGetChamps(endpoints?.champList);

  const { modal, showModal, closeModal } = useModal();
  const { loading, setTeamLoading, stopLoading } = useLoading();
  const { search, setQuery, resetSearch } = useSearch();
  const {
    blueTeam,
    redTeam,
    setBlueChamp,
    setRedChamp,
    rmBlueChamp,
    rmRedChamp,
  } = useTeamsLogic();

  const addChamp = useAddChamp({
    blueTeam,
    redTeam,
    setBlueChamp,
    setRedChamp,
    endpoints,
    showModal,
    setTeamLoading,
    stopLoading,
    resetSearch,
  });

  const blueChampList = React.useMemo(
    () => findChamps(search.queryBlue, champsInitList),
    [search.queryBlue, champsInitList]
  );
  const redChampList = React.useMemo(
    () => findChamps(search.queryRed, champsInitList),
    [search.queryRed, champsInitList]
  );

  return (
    <>
      <button
        className="info"
        onClick={() =>
          showModal(
            <>
              <h1>LoL Team Champs view</h1>
              <span>
                <i>por Sergio Palacios</i>
              </span>
              <p>
                Organiza y Crea equipos con Campeones de{" "}
                <b>League of Legends</b> con el fin de visualizar sus
                habilidades de forma mas comoda y rapida.
              </p>
            </>
          )
        }
      >
        ?
      </button>

      <main className="teams-panel">
        <TeamPanel
          team={TEAM_TYPES.blue}
          className="blue-team"
          teamName="Equipo Azul"
          query={search.queryBlue}
          champList={blueChampList}
          champs={blueTeam}
          loading={loading[TEAM_TYPES.blue]}
          champImg={endpoints?.champImg}
          onSetQuery={(value) => setQuery(TEAM_TYPES.blue, value)}
          onAddChamp={addChamp}
          onRemove={rmBlueChamp}
        />

        <TeamPanel
          team={TEAM_TYPES.red}
          className="red-team"
          teamName="Equipo Rojo"
          query={search.queryRed}
          champList={redChampList}
          champs={redTeam}
          loading={loading[TEAM_TYPES.red]}
          champImg={endpoints?.champImg}
          onSetQuery={(value) => setQuery(TEAM_TYPES.red, value)}
          onAddChamp={addChamp}
          onRemove={rmRedChamp}
        />
      </main>

      {(champsLoading || champsError) && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.65)",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: 8,
            fontSize: 13,
            zIndex: 10,
          }}
        >
          {champsError
            ? "No se pudieron cargar los campeones."
            : "Cargando campeones..."}
        </div>
      )}

      {modal.visible && (
        <Modal onClose={closeModal}>
          <div>{modal.message}</div>
        </Modal>
      )}
    </>
  );
}

export default App;
