import styled from "styled-components";
import { Filter } from "../interfaces";

interface ResetButtonProps {
  setFilter: React.Dispatch<React.SetStateAction<Filter | undefined>>;
}

const Container = styled.button`
  border: 1px solid black;
  background-color: white;
  border-radius: 10px;
  padding: 8px 12px;
  position: fixed;
  left: 20px;
  top: 20px;
  cursor: pointer;
`;

const ResetButton = ({ setFilter }: ResetButtonProps) => {
  const onButtonClick = () => setFilter(undefined);

  return <Container onClick={onButtonClick}>Reset Filter</Container>;
};

export default ResetButton;
