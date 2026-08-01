const CDN_BASE = "https://ddragon.leagueoflegends.com";
const FALLBACK_VERSION = "16.15.1";

function getApiEndpoints(version = FALLBACK_VERSION) {
  const URL = `${CDN_BASE}/cdn/${version}`;

  const CHAMPS_LIST = "/data/es_MX/champion.json";
  const CHAMP_DATA = "/data/es_MX/champion/";
  const CHAMP_IMG = "/img/champion/";

  return {
    champData: URL + CHAMP_DATA,
    champList: URL + CHAMPS_LIST,
    champImg: URL + CHAMP_IMG
  }
}

export default getApiEndpoints;
