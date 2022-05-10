import { Product } from "../interfaces";
import ProductListItem from "./ProductListItem";
import styled from "styled-components";

interface ProductListProps {
  productList: Product[];
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;

  background-color: lightblue;
`;

const ProductList = ({ productList }: ProductListProps) => {
  return (
    <Container>
      {productList.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default ProductList;
