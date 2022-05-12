import { Filter, Product } from "./interfaces";
import { useEffect, useState } from "react";
import { fetchProducts } from "./api";
import styled from "styled-components";
import FilterBar from "./components/FilterBar";
import ProductList from "./components/ProductList";
import PageNavigator from "./components/PageNavigator";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const [filter, setFilter] = useState<Filter>();
  const [productList, setProductList] = useState<Product[]>([]);
  const [productsLength, setProductsLength] = useState<number>(0);

  useEffect(() => {
    fetchProducts(filter).then((response) => {
      setProductList(response.products);
      setProductsLength(response.total);
    });
  }, [filter]);

  return (
    <Container>
      <FilterBar filter={filter} setFilter={setFilter} />
      <ProductList productList={productList} />
      <PageNavigator productsLength={productsLength} />
    </Container>
  );
};

export default App;
