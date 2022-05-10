import { Filter } from "../interfaces";
import styled from "styled-components";
import BrandFilter from "./BrandFilter";
import ColorFilter from "./ColorFilter";

interface FilterBarProps {
  setFilter: React.Dispatch<React.SetStateAction<Filter | undefined>>;
}

const Container = styled.div`
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  display: flex;
`;

const FilterBar = ({ setFilter }: FilterBarProps) => {
  return (
    <Container>
      <Section>
        <BrandFilter setFilter={setFilter} />
        <ColorFilter setFilter={setFilter} />
      </Section>
      <div>카테고리 필터</div>
      <div>가격 필터</div>
    </Container>
  );
};

export default FilterBar;
