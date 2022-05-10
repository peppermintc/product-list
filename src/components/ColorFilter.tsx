import { MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { axiosFetchColors } from "../api";
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

const ColorFilter = ({ filter, setFilter }: ColorFilterProps) => {
  const [colors, setColors] = useState<Color[]>([]);
  const [openList, setOpenList] = useState<boolean>(false);

  const currentColor = filter?.color?.name;

  useEffect(() => {
    if (colors.length === 0)
      axiosFetchColors().then((response) => setColors(response));
  }, [colors]);

  const onSelectedClick = () => {
    setOpenList((prevOpenList) => !prevOpenList);
  };

  const onListItemClick = (e: MouseEvent) => {
    const eventTarget = e.target as HTMLElement;
    const newCurrentColorName = eventTarget.innerText;

    setOpenList(false);
    setFilter((prevFilter: any) => {
      const newFilter = {
        ...prevFilter,
        color: { name: newCurrentColorName },
      };

      return newFilter;
    });
  };

  return (
    <Container>
      <Label>Color:</Label>
      <Selector>
        <Selected onClick={onSelectedClick}>
          {currentColor ? currentColor : "Select Color"}
          <img src={ArrowDownIcon} alt="down" />
        </Selected>
        {openList && (
          <List>
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
