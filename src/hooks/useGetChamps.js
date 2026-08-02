import React from "react";

function useGetChamps(URL) {
  const [champs, setChamps] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!URL) return;

    const controller = new AbortController();

    fetch(URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setChamps(Object.values(data.data));
      })
      .catch((e) => {
        if (e.name === "AbortError") return;
        console.log(e);
        setError(e);
      });

    return () => controller.abort();
  }, [URL]);

  const loading = champs === null && error === null;

  return { champs, loading, error };
}

export default useGetChamps;
