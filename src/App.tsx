import { useEffect, useState } from "react";
import { axiosFetchProducts } from "./api";
import ProductList from "./components/ProductList";
import { Filter, Product } from "./interfaces";
import styled from "styled-components";

const Container = styled.div`
  background-color: yellow;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Filter>();

  useEffect(() => {
    axiosFetchProducts(filter).then((response) =>
      setProductList(response.products)
    );
  }, [filter]);

  return (
    <Container>
      <div>브랜드 필터</div>
      <div>색상 필터</div>
      <div>가격 필터</div>
      <div>카테고리 필터</div>
      <ProductList productList={productList} />
    </Container>
  );
};

export default App;
