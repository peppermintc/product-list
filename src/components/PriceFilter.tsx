import { ChangeEvent } from "react";
import styled from "styled-components";
import { Filter } from "../interfaces";
import RangeSlider from "./RangeSlider";

interface PriceFilterProps {
  filter: Filter | undefined;
  setFilter: React.Dispatch<React.SetStateAction<Filter | undefined>>;
}

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const Inputs = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const InputContainer = styled.div`
  width: 250px;
  height: 50px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 6px 6px;
`;

const Section = styled.div`
  display: flex;
`;

const Label = styled.span`
  font-size: 10px;
  color: gray;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  &:focus {
    outline: none;
  }
`;

const PriceFilter = ({ filter, setFilter }: PriceFilterProps) => {
  const minPrice: number | undefined = filter?.minPrice;
  const maxPrice: number | undefined = filter?.maxPrice;

  const onMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter((prevFilter: any) => {
      const newFilter = { ...prevFilter, minPrice: e.target.value };
      return newFilter;
    });
  };

  const onMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter((prevFilter: any) => {
      const newFilter = { ...prevFilter, maxPrice: e.target.value };
      return newFilter;
    });
  };

  return (
    <Container>
      <RangeSlider />
      <Inputs>
        <InputContainer>
          <Label>최저 금액</Label>
          <Section>
            <span>￦</span>
            <Input
              type="number"
              min={0}
              max={10000000}
              value={minPrice}
              onChange={onMinChange}
              placeholder={"0"}
            />
          </Section>
        </InputContainer>

        <InputContainer>
          <Label>최고 금액</Label>
          <Section>
            <span>￦</span>
            <Input
              type="number"
              min={0}
              max={10000000}
              value={maxPrice}
              onChange={onMaxChange}
              placeholder={"10000000"}
            />
          </Section>
        </InputContainer>
      </Inputs>
    </Container>
  );
};

export default PriceFilter;
