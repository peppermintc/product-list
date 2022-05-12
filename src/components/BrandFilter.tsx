import styled from "styled-components";
import { MouseEvent, useEffect, useState } from "react";
import { fetchBrands } from "../api";
import { Brand, Filter } from "../interfaces";
import ArrowDownIcon from "../img/arrowDown.png";

interface BrandFilterProps {
  filter: Filter | undefined;
  setFilter: React.Dispatch<React.SetStateAction<Filter | undefined>>;
}

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const Label = styled.div`
  padding: 10px;
`;

const Selector = styled.div`
  position: relative;
  width: 180px;
`;

const Selected = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
`;

const List = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 180px;
  max-height: 400px;
  overflow-y: scroll;
  border: 1px solid lightgray;
  z-index: 1;
`;

const ListItem = styled.div`
  width: 100%;
  padding: 10px;
  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
`;

const BrandFilter = ({ filter, setFilter }: BrandFilterProps) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [openList, setOpenList] = useState<boolean>(false);

  useEffect(() => {
    if (brands.length === 0)
      fetchBrands().then((response) => setBrands(response));
  }, [brands]);

  const onSelectedClick = () => {
    setOpenList((prevOpenList) => !prevOpenList);
  };

  const onListItemClick = (e: MouseEvent) => {
    const eventTarget = e.target as HTMLElement;
    const newCurrentBrandName = eventTarget.innerText;

    if (newCurrentBrandName === "All brands") {
      setFilter((prevFilter: any) => {
        const newFilter = {
          ...prevFilter,
          brand: undefined,
        };

        return newFilter;
      });
    } else {
      setFilter((prevFilter: any) => {
        const newFilter = {
          ...prevFilter,
          brand: { name: newCurrentBrandName },
        };

        return newFilter;
      });
    }

    setOpenList(false);
  };

  const currentBrand = filter?.brand?.name;

  return (
    <Container>
      <Label>Brand:</Label>
      <Selector>
        <Selected onClick={onSelectedClick}>
          {currentBrand ? currentBrand : "Select Brand"}
          <Icon src={ArrowDownIcon} alt="down" />
        </Selected>
        {openList && (
          <List>
            <ListItem key="All brands" onClick={onListItemClick}>
              All brands
            </ListItem>
            {brands.map((brand) => (
              <ListItem key={brand.name} onClick={onListItemClick}>
                {brand.name}
              </ListItem>
            ))}
          </List>
        )}
      </Selector>
    </Container>
  );
};

export default BrandFilter;
