import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CardProductDetails from "../../components/cardProductDetails";
import CartProduct from "../../components/cardProduct";
import Modal from "../../components/modal";
import Loader from "../../components/loader";
import { addToCartAction } from "../../redux/actions/cartAction";
import {
  addToFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";
import { setCart } from "../../config/services/firebase/cart";
import {
  deleteFavourite,
  setFavourite,
} from "../../config/services/firebase/favourite";

const ProductDetail = ({ loader, currentUserID }) => {
  const [open, setOpen] = useState(false);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [addToFavouriteLoader, setAddToFavouriteLoader] = useState(false);
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [currentProductData, setCurrentProductData] = useState({});
  const [currentProduct, setCurrentProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch();

  const { productData } = useSelector((stata) => stata.data);
  const { cart } = useSelector((stata) => stata.addToCart);
  const { favourite } = useSelector((stata) => stata.addToFavourite);

  const { id } = useParams();

  const handleFetchProduct = () => {
    let currentCategory = "";
    Object.keys(productData).forEach((category) => {
      const foundProduct = productData[category].find(
        (product) => product.id == id
      );
      if (foundProduct) {
        setCurrentProduct(foundProduct);
        currentCategory = category;
        return;
      }
    });

    if (currentCategory) {
      let relatedProductsTemp = productData[currentCategory].filter(
        (product) => {
          return product.id !== +id;
        }
      );
      setRelatedProducts(relatedProductsTemp);
    }
  };

  const handleCurrentSizes = (price, size) => {
    setCurrentPrice(price);
    setCurrentSize(size);
  };

  const hanldeCurrentColor = (color) => {
    setCurrentColor(color);
  };

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  const handleAddToCart = (currentProductData) => {
    let existingCartItem = cart.find(
      (item) =>
        item.id === currentProductData?.id &&
        item.currentSize === currentSize &&
        item.currentColor === currentColor
    );
    if (existingCartItem) {
      toast.error("Item already in cart", {
        autoClose: 1500,
      });
    } else {
      //exist item not found
      let updatedData = {
        ...currentProductData,
        quantity: 1,
        currentSize: currentSize,
        currentColor: currentColor,
        currentPrice: currentPrice,
      };
      if (currentUserID) {
        //user is login
        handleSetCart(updatedData);
      } else {
        //user is login out
        dispatch(addToCartAction(updatedData));
        toast.success("Cart add successfully!", {
          autoClose: 1500,
        });
      }
    }
  };

  const handleSetCart = async (updatedData) => {
    setAddToCartLoader(true);
    try {
      await setCart(updatedData, currentUserID, cart);
      dispatch(addToCartAction(updatedData));
      setAddToCartLoader(false);
      toast.success("Cart add successfully!", {
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
      setAddToCartLoader(false);
    }
  };

  const handleFavourite = async (currentProductData) => {
    setAddToFavouriteLoader(true);
    let isAlreadyProduct = favourite.find(
      (product) => product.id === currentProductData.id
    );
    if (isAlreadyProduct) {
      toast.error("Item already added!", {
        autoClose: 1500,
      });
    } else {
      if (currentUserID) {
        let response = await setFavourite(
          currentProductData,
          currentUserID,
          favourite
        );
        console.log(response);
        dispatch(addToFavouriteAction(currentProductData));
        setAddToFavouriteLoader(false);
        toast.success("Favourite successfully!", {
          autoClose: 1500,
        });
      } else {
        dispatch(addToFavouriteAction(currentProductData));
        setAddToFavouriteLoader(false);
        toast.success("Favourite successfully!", {
          autoClose: 1500,
        });
      }
    }
  };

  const handleRemoveFavourite = async (currentProductData) => {
    setAddToFavouriteLoader(true);
    if (currentUserID) {
      //user is login
      try {
        let result = await deleteFavourite(
          currentProductData,
          currentUserID,
          favourite
        );
        dispatch(removeFromFavouriteAction(currentProductData.id));
        setAddToFavouriteLoader(false);
        toast.success("Remove favourite!", {
          autoClose: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      //user is logout
      dispatch(removeFromFavouriteAction(currentProductData.id));
      setAddToFavouriteLoader(false);
      toast.success("Remove favourite!", {
        autoClose: 1500,
      });
    }
  };

  useEffect(() => {
    setCurrentPrice("");
    setCurrentColor("");
    handleFetchProduct();
  }, [id]);

  useEffect(() => {
    handleFetchProduct();
  }, [productData]);

  useEffect(() => {
    setCurrentColor("");
    setCurrentPrice("");
    setCurrentSize("");
  }, [open]);

  return (
    <>
      {loader ? (
        <Loader className="h-screen" />
      ) : (
        <>
          <CardProductDetails
            setCurrentPrice={setCurrentPrice}
            handleCurrentSizes={handleCurrentSizes}
            handleAddToCart={handleAddToCart}
            hanldeCurrentColor={hanldeCurrentColor}
            handleSetCart={handleSetCart}
            currentPrice={currentPrice}
            currentColor={currentColor}
            currentProductData={currentProduct}
            addToCartLoader={addToCartLoader}
          />
          <hr className="my-8 border-t" />
          <div className="px-4 md:p-8 lg:p-10">
            <h2 className="font-bold text-xl md:text-3xl">Related products</h2>
            <div className="flex flex-wrap -mx-4 pb-6">
              {relatedProducts.map((product, index) => {
                return (
                  <div className="w-full sm:w-1/2 md:w-1/4 px-4" key={index}>
                    <CartProduct
                      handleModal={handleModal}
                      handleFavourite={handleFavourite}
                      handleRemoveFavourite={handleRemoveFavourite}
                      favourite={favourite}
                      productData={product}
                      addToFavouriteLoader={addToFavouriteLoader}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
        <CardProductDetails
          currentProductData={currentProductData}
          currentPrice={currentPrice}
          currentColor={currentColor}
          addToCartLoader={addToCartLoader}
          setCurrentPrice={setCurrentPrice}
          handleCurrentSizes={handleCurrentSizes}
          handleAddToCart={handleAddToCart}
          hanldeCurrentColor={hanldeCurrentColor}
          handleSetCart={handleSetCart}
        />
      </Modal>
    </>
  );
};

export default ProductDetail;
