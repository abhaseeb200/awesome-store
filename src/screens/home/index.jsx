import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../../components/heroSection";
import CartProduct from "../../components/cardProduct";
import CardProductDetails from "../../components/cardProductDetails";
import Modal from "../../components/modal";
import SingleDetailCard from "./components/singleDetailCard";
import homeBannar from "../../assets/home-bannar.jpg";
import Loader from "../../components/loader";
import { toast } from "react-toastify";
import { setCart } from "../../config/services/firebase/cart";
import { addToCartAction } from "../../redux/actions/cartAction";
import {
  addToFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";
import {
  deleteFavourite,
  setFavourite,
} from "../../config/services/firebase/favourite";

const Home = ({
  loader,
  currentUserID,
  loaderfavourite,
}) => {
  const [open, setOpen] = useState(false);
  const [currentProductData, setCurrentProductData] = useState({});
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [addToFavouriteLoader, setAddToFavouriteLoader] = useState(false);
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();

  const productsByCategory = useSelector((state) => state.data.productData);
  const { cart } = useSelector((stata) => stata.addToCart);
  const { favourite } = useSelector((stata) => stata.addToFavourite);

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  const handleCurrentSizes = (price, size) => {
    setCurrentPrice(price);
    setCurrentSize(size);
  };

  const hanldeCurrentColor = (color) => {
    setCurrentColor(color);
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
        setAddToFavouriteLoader(true);
        await setFavourite(currentProductData, currentUserID, favourite);
        dispatch(addToFavouriteAction(currentProductData));
        toast.success("Favourite successfully!", {
          autoClose: 1500,
        });
        setAddToFavouriteLoader(false);
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
        setAddToFavouriteLoader(false);
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
    setCurrentColor("");
    setCurrentPrice("");
    setCurrentSize("");
  }, [open]);

  return (
    <>
      <HeroSection title="We have 50% discounts" backgroundImage={homeBannar} />
      <div className="px-4 md:p-8 lg:p-10">
        {loader ? (
          <Loader />
        ) : (
          Object.keys(productsByCategory).map((category, ind) => {
            return (
              <div key={ind} className="space-y-4 mb-16">
                <h2 className="font-bold lg:text-3xl capitalize pb-3">
                  {category}
                </h2>
                <SingleDetailCard
                  productData={productsByCategory[category]}
                  handleModal={handleModal}
                  favourite={favourite}
                  handleFavourite={handleFavourite}
                  handleRemoveFavourite={handleRemoveFavourite}
                  addToFavouriteLoader={addToFavouriteLoader}
                />
                <div className="flex flex-wrap -mx-4">
                  {productsByCategory[category]
                    .slice(1)
                    .map((product, productIND) => {
                      return (
                        <div
                          className="w-full sm:w-1/2 md:w-1/4 px-4"
                          key={productIND}
                        >
                          <CartProduct
                            handleModal={handleModal}
                            productData={product}
                            favourite={favourite}
                            handleFavourite={handleFavourite}
                            handleRemoveFavourite={handleRemoveFavourite}
                            addToFavouriteLoader={addToFavouriteLoader}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })
        )}

        <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
          <CardProductDetails
            currentProductData={currentProductData}
            handleCurrentSizes={handleCurrentSizes}
            hanldeCurrentColor={hanldeCurrentColor}
            handleAddToCart={handleAddToCart}
            handleSetCart={handleSetCart}
            currentPrice={currentPrice}
            currentColor={currentColor}
            addToCartLoader={addToCartLoader}
          />
        </Modal>
      </div>
    </>
  );
};

export default Home;
