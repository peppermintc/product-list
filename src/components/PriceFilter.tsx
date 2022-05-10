import { ChangeEvent } from "react";
import styled from "styled-components";
import { Filter } from "../interfaces";

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

const RangeSlider = styled.input`
  width: 100%;
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

const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  margin: 20px;
  padding: 10px 20px;
`;

const PriceFilter = ({ filter, setFilter }: PriceFilterProps) => {
  const minPrice: number | undefined = filter?.minPrice;
  const maxPrice: number | undefined = filter?.maxPrice;

  const onRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const new
  };

  return (
    <Container>
      <RangeSlider
        type="range"
        min="0"
        max="10000000"
        onChange={onRangeChange}
      />
      <Inputs>
        <InputContainer>
          <Label>최저 금액</Label>
          <Section>
            <span>￦</span>
            <Input type="number" min={0} max={10000000} value={minPrice} />
          </Section>
        </InputContainer>

        <InputContainer>
          <Label>최고 금액</Label>
          <Section>
            <span>￦</span>
            <Input type="number" min={0} max={10000000} value={maxPrice} />
          </Section>
        </InputContainer>
      </Inputs>
      <Button>Apply Price</Button>
    </Container>
  );
};

export default PriceFilter;
