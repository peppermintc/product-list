import { MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { axiosFetchBrands } from "../api";
import { Brand, Filter } from "../interfaces";
import ArrowDownIcon from "../img/arrowDown.png";

interface BrandFilterProps {
  setFilter: React.Dispatch<React.SetStateAction<Filter | undefined>>;
}

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const Label = styled.div`
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
`;

const Selector = styled.div`
  position: relative;
  width: 180px;
`;

const Selected = styled.div`
  padding: 10px;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
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
  max-height: 700px;
  overflow-y: scroll;
`;

const ListItem = styled.div`
  width: 100%;
  padding: 10px;
  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
`;

const BrandFilter = ({ setFilter }: BrandFilterProps) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [openList, setOpenList] = useState<boolean>(false);
  const [currentBrand, setCurrentBrand] = useState<Brand>();

  useEffect(() => {
    if (brands.length === 0)
      axiosFetchBrands().then((response) => setBrands(response));
  }, [brands]);

  const onSelectedClick = () => {
    setOpenList((prevOpenList) => !prevOpenList);
  };

  const onListItemClick = (e: MouseEvent) => {
    const eventTarget = e.target as HTMLElement;
    const newCurrentBrandName = eventTarget.innerText;

    setOpenList(false);
    setCurrentBrand({ name: newCurrentBrandName });
  };

  useEffect(() => {
    if (currentBrand === undefined) return;

    setFilter((prevFilter: any) => {
      const newFilter = {
        ...prevFilter,
        brand: currentBrand,
      };

      return newFilter;
    });
  }, [currentBrand, setFilter]);

  return (
    <Container>
      <Label>Brand:</Label>
      <Selector>
        <Selected onClick={onSelectedClick}>
          {currentBrand ? currentBrand.name : "Select Brand"}
          <img src={ArrowDownIcon} alt="down" />
        </Selected>
        {openList && (
          <List>
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
