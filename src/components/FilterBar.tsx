import { Filter } from "../interfaces";
import styled from "styled-components";
import BrandFilter from "./BrandFilter";
import ColorFilter from "./ColorFilter";
import CategoryFilter from "./CategoryFilter";

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
      <CategoryFilter setFilter={setFilter} />
      <div>가격 필터</div>
    </Container>
  );
};

export default FilterBar;
