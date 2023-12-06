import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardProductDetails from "../../components/cardProductDetails";
import CartProduct from "../../components/cardProduct";
import Modal from "../../components/modal";
import { addToCartAction } from "../../redux/actions/cartAction";
import Loader from "../../components/loader";
import { setCart } from "../../config/services/firebase/cart";
import { auth } from "../../config/firebaseConfig";
import { toast } from "react-toastify";

const ProductDetail = ({ loader, currentUserID,docID }) => {
  const [open, setOpen] = useState(false);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [currentPrice, setCurrentPrice] = useState("");
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

  const hanldeCurrentColor = (color) => {
    console.log("//////////////////////", color);
    setCurrentColor(color);
  };

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  console.log(currentUserID, "CURRENT USER.....");

  const handleAddToCart = (currentProductData) => {
    // console.log(currentProductData,"_______");
    // let currentUser = auth.currentUser
    console.log(currentUserID, "________________");
    const existingCartItem = cart.find(
      (item) =>
        item.id === currentProductData.id &&
        item.currentSize === currentSize &&
        item.currentColor === currentColor
    );
    if (existingCartItem) {
      console.log(
        `Product of size ${currentSize} & ${currentColor} already in cart`
      );
    } else {
      //user is login
      if (currentUserID) {
        handleSetCart(currentProductData);
      } else {
        //user is login out
        dispatch(addToCartAction(currentProductData, currentSize, currentColor,currentPrice,""));
      }
    }
  };

  const handleSetCart = async (currentProductData) => {
    setAddToCartLoader(true);
    let updatedData = {
      ...currentProductData,
      quantity: 1,
      currentSize: currentSize,
      currentColor: currentColor,
      currentPrice: currentPrice,
    };
    console.log(updatedData, currentUserID);
    try {
      let response = await setCart(updatedData, currentUserID);
      toast.success("Cart add successfully!", {
        autoClose: 1500,
      });
      dispatch(addToCartAction(currentProductData, currentSize, currentColor,currentPrice,response.id));
      setAddToCartLoader(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setAddToCartLoader(false);
    }
  };

  useEffect(() => {
    setCurrentPrice("");
    setCurrentColor("");
  }, [id]);

  return (
    <>
      {loader ? (
        <Loader className="h-screen" />
      ) : (
        <>
          <CardProductDetails
            currentProductData={currentProduct}
            currentPrice={currentPrice}
            currentColor={currentColor}
            setCurrentPrice={setCurrentPrice}
            handleCurrentSizes={handleCurrentSizes}
            handleAddToCart={handleAddToCart}
            hanldeCurrentColor={hanldeCurrentColor}
            handleSetCart={handleSetCart}
            addToCartLoader={addToCartLoader}
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
        </>
      )}

      <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
        <CardProductDetails currentProductData={currentProductData} />
      </Modal>
    </>
  );
};

export default ProductDetail;
