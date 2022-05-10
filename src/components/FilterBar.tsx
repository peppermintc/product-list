import { Filter } from "../interfaces";
import styled from "styled-components";
import BrandFilter from "./BrandFilter";
import ColorFilter from "./ColorFilter";
import CategoryFilter from "./CategoryFilter";
import ResetButton from "./ResetButton";

interface FilterBarProps {
  filter: Filter | undefined;
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

const FilterBar = ({ filter, setFilter }: FilterBarProps) => {
  return (
    <Container>
      <Section>
        <BrandFilter filter={filter} setFilter={setFilter} />
        <ColorFilter filter={filter} setFilter={setFilter} />
      </Section>
      <CategoryFilter filter={filter} setFilter={setFilter} />
      <ResetButton setFilter={setFilter} />
      <div>가격 필터</div>
    </Container>
  );
};

export default FilterBar;
