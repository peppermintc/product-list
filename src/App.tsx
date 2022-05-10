import { useEffect, useState } from "react";
import { axiosFetchProducts } from "./api";
import ProductList from "./components/ProductList";
import { Filter, Product } from "./interfaces";
import styled from "styled-components";
import FilterBar from "./components/FilterBar";

const Container = styled.div`
  background-color: yellow;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Filter>();

  const updateFilter = (newFilter: Filter) => setFilter(newFilter);

  useEffect(() => {
    axiosFetchProducts(filter).then((response) =>
      setProductList(response.products)
    );
  }, [filter]);

  return (
    <Container>
      <FilterBar updateFilter={updateFilter} />
      <ProductList productList={productList} />
    </Container>
  );
};

export default App;
