import React from "react";

const STORAGE_KEY = "lol-champ-settings";

export const DEFAULT_SETTINGS = {
  keepHeaderVisible: false,
  showSpells: true,
  jadeOnly: false,
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function useSettings() {
  const [settings, setSettings] = React.useState(loadSettings);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // storage no disponible
    }
  }, [settings]);

  return { settings, setSettings };
}

export default useSettings;
