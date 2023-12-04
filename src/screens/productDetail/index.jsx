import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CardProductDetails from "../../components/cardProductDetails";

const ProductDetail = () => {
  const { productData } = useSelector((stata) => stata.data);
  const { id } = useParams();

  let currentProduct = {};
  Object.keys(productData).forEach((category) => {
    const foundProduct = productData[category].find(
      (product) => product.id == id
    );
    if (foundProduct) {
      currentProduct = foundProduct;
      return;
    }
  });

  console.log(currentProduct, "-------");

  return (
    <>
      <h2>product detaill page</h2>
      <CardProductDetails currentProductData={currentProduct} />
    </>
  );
};

export default ProductDetail;
