import { Product } from "../interfaces";
import getSaleRate from "../utils/getSaleRate";
import styled from "styled-components";

const Container = styled.div`
  background-color: pink;

  width: 250px;
  height: 400px;
`;

const Thumbnail = styled.img`
  width: 100%;
  min-width: 250px;
  min-height: 250px;
  object-fit: cover;
`;

interface ProductListItemProps {
  product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Container>
      <Thumbnail src={product.image} alt="thumbnail" />
      <div>{product.brand}</div>
      <div>{product.name}</div>
      <div>{product.original_price}</div>
      <div>{getSaleRate(product.original_price, product.sales_price)}</div>
    </Container>
  );
};

export default ProductListItem;
