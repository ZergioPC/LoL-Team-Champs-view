import React from "react";
import "./App.css";

import { Modal } from "./components/Modal";
import { TeamPanel } from "./components/TeamPanel";
import { LolSearch } from "./components/LolSearch";

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
  const blueInputRef = React.useRef(null);
  const redInputRef = React.useRef(null);

  const handleSearchTab = (e) => {
    if (e.key !== "Tab") return;
    const inBlue = e.target === blueInputRef.current;
    const inRed = e.target === redInputRef.current;
    if (!inBlue && !inRed) return;

    e.preventDefault();
    const next = inBlue ? redInputRef.current : blueInputRef.current;
    next?.focus();
  };

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
    <header className="search-bar-wrapper" onKeyDown={handleSearchTab}>
      <div className="search-bar-container">
        <LolSearch
          query={search.queryBlue}
          teamName="Equipo Azul"
          champList={blueChampList}
          inputRef={blueInputRef}
          OnSetQuery={(value) => setQuery(TEAM_TYPES.blue, value)}
          OnAddChamp={(id) => addChamp(TEAM_TYPES.blue, id)}
        />

        <button
          className="info"
          tabIndex={-1}
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

        <LolSearch
          query={search.queryRed}
          teamName="Equipo Rojo"
          champList={redChampList}
          inputRef={redInputRef}
          OnSetQuery={(value) => setQuery(TEAM_TYPES.red, value)}
          OnAddChamp={(id) => addChamp(TEAM_TYPES.red, id)}
        />
      </div>
      <div className="search-bar-control">
        <div></div>
      </div>
    </header>

    <main className="teams-panel">
      <TeamPanel
        team={TEAM_TYPES.blue}
        className="blue-team"
        champs={blueTeam}
        loading={loading[TEAM_TYPES.blue]}
        champImg={endpoints?.champImg}
        onRemove={rmBlueChamp}
      />

      <TeamPanel
        team={TEAM_TYPES.red}
        className="red-team"
        champs={redTeam}
        loading={loading[TEAM_TYPES.red]}
        champImg={endpoints?.champImg}
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
