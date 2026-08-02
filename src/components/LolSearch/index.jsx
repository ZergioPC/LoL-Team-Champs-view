import React from "react";
import "./LolSearch.css";

const LolSearch = ({ query, teamName, champList, OnSetQuery, OnAddChamp, inputRef }) => {
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [prevQuery, setPrevQuery] = React.useState(query);
  const resultsRef = React.useRef(null);

  if (prevQuery !== query) {
    setPrevQuery(query);
    setActiveIndex(-1);
  }

  const showResults = query.length > 0 && champList.length > 0;
  const noMatches = query.length > 0 && champList.length === 0;

  const scrollActiveIntoView = (index) => {
    const list = resultsRef.current;
    const item = list?.children[index];
    item?.scrollIntoView({ block: "nearest" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (showResults) {
        e.preventDefault();
        setActiveIndex((i) => {
          const next = (i + 1) % champList.length;
          scrollActiveIntoView(next);
          return next;
        });
      }
    } else if (e.key === "ArrowUp") {
      if (showResults) {
        e.preventDefault();
        setActiveIndex((i) => {
          const prev = (i - 1 + champList.length) % champList.length;
          scrollActiveIntoView(prev);
          return prev;
        });
      }
    } else if (e.key === "Enter") {
      if (showResults) {
        e.preventDefault();
        const index = activeIndex >= 0 ? activeIndex : 0;
        OnAddChamp(champList[index].id);
      }
    } else if (e.key === "Escape") {
      if (query) {
        e.preventDefault();
        OnSetQuery("");
      }
    }
  };

  return (
    <div className="LolSearch">
      <h2>{teamName}</h2>
      <div className="LolSearch-input">
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Buscar Champ"
          onChange={(e) => OnSetQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {(showResults || noMatches) && (
          <ul className="LolSearch-results" ref={resultsRef}>
            {noMatches && <li key="0">No hay Coincidencias</li>}
            {showResults &&
              champList.map((champ, idx) => (
                <li
                  key={champ.id}
                  className={idx === activeIndex ? "active" : ""}
                >
                  <button
                    tabIndex={-1}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => OnAddChamp(champ.id)}
                  >
                    {champ.name}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export { LolSearch };
