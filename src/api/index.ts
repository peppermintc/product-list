import axios from "axios";
import { Filter } from "../interfaces";

export const axiosFetchProducts = async (filter: Filter | undefined) => {
  return await axios
    .get(
      "https://lz5cdtbtci.execute-api.ap-northeast-2.amazonaws.com/assignment/products",
      {
        params: filter && {
          brand: filter.brand,
          categoryId: filter.categoryId,
          page: filter.page,
          color: filter.color,
          maxPrice: filter.maxPrice,
          minPrice: filter.minPrice,
        },
      }
    )
    .then((response) => response.data)
    .catch(console.error);
};
