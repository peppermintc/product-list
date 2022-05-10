import { Filter } from "../interfaces";
import styled from "styled-components";

interface FilterBarProps {
  updateFilter: (newFilter: Filter) => void;
}

const Container = styled.div`
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FilterBar = ({ updateFilter }: FilterBarProps) => {
  return (
    <Container>
      <div>브랜드 필터</div>
      <div>색상 필터</div>
      <div>가격 필터</div>
      <div>카테고리 필터</div>
    </Container>
  );
};

export default FilterBar;
