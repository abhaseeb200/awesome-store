import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CardProductDetails from "../../components/cardProductDetails";
import CartProduct from "../../components/cardProduct";
import Modal from "../../components/modal";
import Loader from "../../components/loader";
import { addToCartAction } from "../../redux/actions/cartAction";
import { setCart } from "../../config/services/firebase/cart";
import {
  deleteFavourite,
  setFavourite,
} from "../../config/services/firebase/favourite";
import {
  addToFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";

const ProductDetail = ({ loader, currentUserID, loaderfavourite }) => {
  const [open, setOpen] = useState(false);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
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

  const handleSetCart = async (currentProductData) => {
    setAddToCartLoader(true);
    let updatedData = {
      ...currentProductData,
      quantity: 1,
      currentSize: currentSize,
      currentColor: currentColor,
      currentPrice: currentPrice,
    };
    try {
      let response = await setCart(updatedData, currentUserID, cart);
      dispatch(addToCartAction(updatedData));
      toast.success("Cart add successfully!", {
        autoClose: 1500,
      });
      setAddToCartLoader(false);
    } catch (error) {
      console.log(error);
      setAddToCartLoader(false);
    }
  };

  const handleAddToCart = (currentProductData) => {
    const existingCartItem = cart.find(
      (item) =>
        item.id === currentProductData.id &&
        item.currentSize === currentSize &&
        item.currentColor === currentColor
    );
    if (existingCartItem) {
      toast.error("Item already in cart", {
        autoClose: 1500,
      });
    } else {
      //user is login
      if (currentUserID) {
        handleSetCart(currentProductData);
      } else {
        //user is login out
        let updatedData = {
          ...currentProductData,
          quantity: 1,
          currentSize: currentSize,
          currentColor: currentColor,
          currentPrice: currentPrice,
        };
        dispatch(addToCartAction(updatedData));
        toast.success("Cart add successfully!", {
          autoClose: 1500,
        });
      }
    }
  };

  const handleFavourite = async (currentProductData) => {
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
        toast.success("Favourite successfully!", {
          autoClose: 1500,
        });
      } else {
        dispatch(addToFavouriteAction(currentProductData));
        toast.success("Favourite successfully!", {
          autoClose: 1500,
        });
      }
    }
  };

  const handleRemoveFavourite = async (currentProductData) => {
    if (currentUserID) {
      //user is login
      try {
        let result = await deleteFavourite(
          currentProductData,
          currentUserID,
          favourite
        );
        dispatch(removeFromFavouriteAction(currentProductData.id));
        toast.success("Remove favourite!", {
          autoClose: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      //user is logout
      dispatch(removeFromFavouriteAction(currentProductData.id));
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
          <hr className="my-8 border-t" />
          <div className="overflow-x-hidden myPadding pb-8">
            <h2 className="font-bold text-3xl">Related products</h2>
            <div className="flex flex-wrap items-center w-full overflow-x-auto pb-6">
              {relatedProducts.map((product, index) => {
                return (
                  <div className="w-full sm:w-1/2 md:w-1/4 px-4" key={index}>
                    <CartProduct
                      productData={product}
                      favourite={favourite}
                      handleModal={handleModal}
                      handleFavourite={handleFavourite}
                      handleRemoveFavourite={handleRemoveFavourite}
                      loaderfavourite={loaderfavourite}
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
      </Modal>
    </>
  );
};

export default ProductDetail;
