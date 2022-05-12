import axios from "axios";
import { Filter } from "../interfaces";

const axiosGet = (path: string, params?: {}) => {
  if (params === undefined) {
    return axios
      .get(
        `https://lz5cdtbtci.execute-api.ap-northeast-2.amazonaws.com/assignment/${path}`
      )
      .then((response) => response.data)
      .catch(console.error);
  } else {
    return axios
      .get(
        `https://lz5cdtbtci.execute-api.ap-northeast-2.amazonaws.com/assignment/${path}`,
        params
      )
      .then((response) => response.data)
      .catch(console.error);
  }
};

export const axiosFetchProducts = (filter: Filter | undefined) => {
  return axiosGet("products", {
    params: filter && {
      brand: filter.brand && filter.brand.name,
      categoryId: filter.categoryId,
      page: filter.page,
      color: filter.color && filter.color.name,
      maxPrice: filter.maxPrice,
      minPrice: filter.minPrice,
    },
  });
};
export const axiosFetchBrands = () => axiosGet("brands");
export const axiosFetchColors = () => axiosGet("colors");
export const axiosFetchCategories = () => axiosGet("categories");
