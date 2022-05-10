import { Filter, Product } from "./interfaces";
import { useEffect, useState } from "react";
import { axiosFetchProducts } from "./api";
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
  const [productList, setProductList] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Filter>();
  const [productsResponse, setProductsResponse] = useState<{
    products: Product[];
    total: number;
  }>();

  useEffect(() => {
    axiosFetchProducts(filter).then((response) => {
      setProductList(response.products);
      setProductsResponse(response);
    });
  }, [filter]);

  return (
    <Container>
      <FilterBar filter={filter} setFilter={setFilter} />
      <ProductList productList={productList} />
      <PageNavigator
        productsLength={productsResponse ? productsResponse.products.length : 0}
        totalLength={productsResponse ? productsResponse.total : 0}
      />
    </Container>
  );
};

export default App;
