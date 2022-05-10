import { Product } from "../interfaces";
import getSaleRate from "../utils/getSaleRate";
import styled from "styled-components";

const Container = styled.div`
  width: 220px;
  height: 350px;
  border: 1px solid lightgray;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;
  min-width: 220px;
  min-height: 220px;
  object-fit: cover;
  border-bottom: 1px solid lightgray;
`;

const Description = styled.div`
  padding: 10px;
`;

interface ProductListItemProps {
  product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Container>
      <Thumbnail src={product.image} alt="thumbnail" />
      <Description>
        <div>{product.brand}</div>
        <div>{product.name}</div>
        <div>{product.original_price}</div>
        <div>{getSaleRate(product.original_price, product.sales_price)}</div>
      </Description>
    </Container>
  );
};

export default ProductListItem;
