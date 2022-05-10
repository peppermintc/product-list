import { Product } from "../interfaces";
import getSaleRate from "../utils/getSaleRate";
import styled from "styled-components";

const Container = styled.div`
  background-color: pink;

  width: 220px;
  height: 350px;
`;

const Thumbnail = styled.img`
  width: 100%;
  min-width: 220px;
  min-height: 220px;
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
