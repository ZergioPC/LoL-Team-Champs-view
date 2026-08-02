function findChamps(query, list) {
  const maxLength = 5;
  const lowerQuery = query.trim().toLowerCase();
  if (!lowerQuery) return [];

  const results = [];
  for (const champ of list) {
    if (results.length >= maxLength) break;
    if (champ.name.toLowerCase().includes(lowerQuery)) results.push(champ);
  }
  return results;
}

export default findChamps;
