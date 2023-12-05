import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardProductDetails from "../../components/cardProductDetails";
import CartProduct from "../../components/cardProduct";
import Modal from "../../components/modal";
import { addToCartAction } from "../../redux/actions/cartAction";

const ProductDetail = () => {
  const [open, setOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [currentProductData, setCurrentProductData] = useState({});
  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch();
  const { productData } = useSelector((stata) => stata.data);
  const { cart } = useSelector((stata) => stata.addToCart);
  const { id } = useParams();

  let currentProduct = {};
  let currentCategory = "";
  let relatedProducts = [];

  Object.keys(productData).forEach((category) => {
    const foundProduct = productData[category].find(
      (product) => product.id == id
    );
    if (foundProduct) {
      currentProduct = foundProduct;
      currentCategory = category;
      return;
    }
  });

  if (currentCategory) {
    // console.log(currentCategory, "----", productData[currentCategory]);
    relatedProducts = productData[currentCategory].filter((product) => {
      return product.id !== +id;
    });
  }

  // console.log("++++++++++++++++++=", cart);
  const handleCurrentSizes = (price, size) => {
    // console.log(size,"//////////////////////", price);
    setCurrentPrice(price);
    setCurrentSize(size);
  };

  const hanldeCurrentColor =  (color) => {
    console.log("//////////////////////", color);
    setCurrentColor(color)
  }

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  const handleAddToCart = (currentProductData) => {
    // Check if the product of the same size is already in the cart
    const existingCartItem = cart.find(
      (item) =>
        item.id === currentProductData.id && item.currentSize === currentSize && item.currentColor === currentColor
    );
    if (existingCartItem) {
      console.log(`Product of size ${currentSize} & ${currentColor} already in cart`);
    } else {
      dispatch(addToCartAction(currentProductData, currentSize, currentColor));
    }
  };

  useEffect(() => {
    console.log(currentProduct?.sizes?.small,"_________________________");
    // setCurrentPrice(currentProduct?.sizes?.small);
    setCurrentPrice(null);
    setCurrentColor("");
  }, [id]);

  return (
    <>
      <CardProductDetails
        currentProductData={currentProduct}
        currentPrice={currentPrice}
        currentColor= {currentColor}
        setCurrentPrice={setCurrentPrice}
        handleCurrentSizes={handleCurrentSizes}
        handleAddToCart={handleAddToCart}
        hanldeCurrentColor = {hanldeCurrentColor}
      />
      <hr className="my-8 border-t  " />
      <div className="overflow-x-hidden myPadding pb-8">
        <h2 className="font-bold text-3xl">Related products</h2>
        <div className=" flex items-center gap-x-3 w-full overflow-x-auto pb-6">
          {relatedProducts.map((product, index) => {
            return (
              <CartProduct
                key={index}
                productData={product}
                handleModal={handleModal}
              />
            );
          })}
        </div>
      </div>

      <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
        <CardProductDetails currentProductData={currentProductData} />
      </Modal>
    </>
  );
};

export default ProductDetail;
