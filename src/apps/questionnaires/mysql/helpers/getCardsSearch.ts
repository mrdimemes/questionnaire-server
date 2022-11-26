const getCardsSearch = (searchPhrase: string) => {
  if (searchPhrase.length === 0) return "";
  return `label LIKE '%${searchPhrase}%'`;
};

export default getCardsSearch;