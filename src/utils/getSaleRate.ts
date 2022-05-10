export const getSaleRate = (
  originalPrice: number,
  salesPrice: number
): string => {
  const saleRate =
    String(Math.floor(((originalPrice - salesPrice) / originalPrice) * 100)) +
    "%";
  return saleRate;
};
