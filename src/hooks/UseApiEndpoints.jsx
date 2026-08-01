import React from "react";
import getApiEndpoints from "../utils/getApiEndpoints";

const VERSIONS_URL = "https://ddragon.leagueoflegends.com/api/versions.json";

let cachedVersion = null;

async function getLatestDragonVersion() {
  if (cachedVersion) return cachedVersion;

  const res = await fetch(VERSIONS_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const versions = await res.json();
  cachedVersion = versions[0];
  return cachedVersion;
}

function UseApiEndpoints() {
  const [endpoints, setEndpoints] = React.useState(null);

  React.useEffect(() => {
    let active = true;

    getLatestDragonVersion()
      .then((version) => {
        if (!active) return;
        setEndpoints(getApiEndpoints(version));
      })
      .catch((e) => {
        console.warn("No se pudo obtener la ultima version de DDragon, usando version de respaldo:", e);
        if (!active) return;
        setEndpoints(getApiEndpoints());
      });

    return () => {
      active = false;
    };
  }, []);

  return endpoints;
}

export default UseApiEndpoints;
