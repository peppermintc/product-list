import { Product } from "../interfaces";
import getSaleRate from "../utils/getSaleRate";
import styled from "styled-components";
import NoImageSrc from "../img/noImgSrc.png";
import { formatPrice } from "../utils/formatPrice";

interface ProductListItemProps {
  product: Product;
}

const Container = styled.div`
  width: 220px;
  height: 350px;
  border: 1px solid lightgray;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;
  min-width: 220px;
  min-height: 220px;
  object-fit: cover;
  border-bottom: 1px solid lightgray;
`;

const Description = styled.div`
  padding: 10px;
`;

const ProductListItem = ({ product }: ProductListItemProps) => {
  const getThumbnailSrc = () => {
    if (product.image.includes("http")) return product.image;
    else return NoImageSrc;
  };

  return (
    <Container>
      <Thumbnail src={getThumbnailSrc()} alt="thumbnail" />
      <Description>
        <div>{product.brand}</div>
        <div>{product.name}</div>
        <div>Price: {formatPrice(product.original_price)}</div>
        <div>
          Sale Rate: {getSaleRate(product.original_price, product.sales_price)}
        </div>
      </Description>
    </Container>
  );
};

export default ProductListItem;
