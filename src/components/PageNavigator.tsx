import { useEffect } from "react";
import styled from "styled-components";

interface PageNavigatorProps {
  productsLength: number;
  totalLength: number;
}

const Container = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageNavigator = ({ productsLength, totalLength }: PageNavigatorProps) => {
  const totalPages: number = Math.ceil(totalLength / productsLength);

  useEffect(() => {
    if (!totalPages) return;

    const totalPageSections = Math.ceil(totalPages / 10);
    console.log(totalPageSections);
  }, [totalPages]);

  return (
    <Container>
      <div>totalPages: {totalPages ? totalPages : 0}</div>
    </Container>
  );
};

export default PageNavigator;
