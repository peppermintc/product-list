import { useEffect } from "react";
import styled from "styled-components";

interface PageNavigatorProps {
  productsLength: number;
}

const Container = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageNavigator = ({ productsLength }: PageNavigatorProps) => {
  const totalPages: number = Math.ceil(productsLength / 20);

  return (
    <Container>
      <div>totalPages: {totalPages}</div>
    </Container>
  );
};

export default PageNavigator;
