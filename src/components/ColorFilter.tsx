import { MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { fetchColors } from "../api";
import { Color, Filter } from "../interfaces";
import ArrowDownIcon from "../img/arrowDown.png";

interface ColorFilterProps {
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

const ColorFilter = ({ filter, setFilter }: ColorFilterProps) => {
  const [colors, setColors] = useState<Color[]>([]);
  const [openList, setOpenList] = useState<boolean>(false);

  useEffect(() => {
    if (colors.length === 0)
      fetchColors().then((response) => setColors(response));
  }, [colors]);

  const onSelectedClick = () => {
    setOpenList((prevOpenList) => !prevOpenList);
  };

  const onListItemClick = (e: MouseEvent) => {
    const eventTarget = e.target as HTMLElement;
    const newCurrentColorName = eventTarget.innerText;

    if (newCurrentColorName === "All colors") {
      setFilter((prevFilter: any) => {
        const newFilter = {
          ...prevFilter,
          color: undefined,
        };

        return newFilter;
      });
    } else {
      setFilter((prevFilter: any) => {
        const newFilter = {
          ...prevFilter,
          color: { name: newCurrentColorName },
        };

        return newFilter;
      });
    }

    setOpenList(false);
  };

  const currentColor = filter?.color?.name;

  return (
    <Container>
      <Label>Color:</Label>
      <Selector>
        <Selected onClick={onSelectedClick}>
          {currentColor ? currentColor : "Select Color"}
          <Icon src={ArrowDownIcon} alt="down" />
        </Selected>
        {openList && (
          <List>
            <ListItem key="All colors" onClick={onListItemClick}>
              All colors
            </ListItem>
            {colors.map((color) => (
              <ListItem key={color.name} onClick={onListItemClick}>
                {color.name}
              </ListItem>
            ))}
          </List>
        )}
      </Selector>
    </Container>
  );
};

export default ColorFilter;
