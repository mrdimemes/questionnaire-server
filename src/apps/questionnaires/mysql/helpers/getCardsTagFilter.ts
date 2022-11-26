const getCardsTagFilter = (filterTag: number | null) => {
  if (filterTag === null) return "";
  return "tag_id = " + filterTag;
};

export default getCardsTagFilter;