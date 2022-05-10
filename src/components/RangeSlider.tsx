import { MouseEvent, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 10px;
  background-color: lightblue;
  position: relative;
  margin-bottom: 20px;
`;

const Left = styled.div<{ xPosition: string }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: ${({ xPosition }) => xPosition};
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
`;

const Right = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
`;

const Fill = styled.div`
  background-color: #54a0b9;
  width: 100%;
  height: 10px;
`;

const RangeSlider = () => {
  const [dragLeft, setDragLeft] = useState<boolean>(false);
  const [xLeft] = useState<string>("0px");

  const onMouseDownLeft = (e: MouseEvent) => {
    setDragLeft(true);
  };

  const onMouseUpLeft = (e: MouseEvent) => {
    setDragLeft(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (dragLeft === true) {
      const element = e.target as HTMLElement;
      console.log(element.clientLeft);
    }
  };

  return (
    <Container>
      <Left
        onMouseDown={onMouseDownLeft}
        onMouseUp={onMouseUpLeft}
        onMouseMove={onMouseMove}
        xPosition={xLeft}
      />
      <Fill />
      <Right />
    </Container>
  );
};

export default RangeSlider;
