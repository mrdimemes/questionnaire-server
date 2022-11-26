import { SortOption } from "../../models";


const getCardsSortOrder = (sortOption: SortOption | null) => {
  if (!sortOption) return "";
  let order = "ORDER BY "
  if (sortOption === SortOption.Alphabet) {
    order += "label "
  } else if (sortOption === SortOption.ReverseAlphabet) {
    order += "label DESC "
  } else if (sortOption === SortOption.NoSort) {
    return "";
  };
  return order;
};

export default getCardsSortOrder;