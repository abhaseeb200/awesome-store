import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import HeroSection from "../../components/heroSection";
import HeroSectionSkeleton from "../../components/heroSection/skeleton";
import CartProduct from "../../components/cardProduct";
import CartProductSkeleton from "../../components/cardProduct/skeleton";
import CardProductDetails from "../../components/cardProductDetails";
import SingleDetailCardSkeleton from "./component/skeleton";
import Modal from "../../components/modal";
import SingleDetailCard from "./component/index";
import InfiniteScroll from "react-infinite-scroll-component";
import { addToCartAction } from "../../redux/actions/cartAction";
import {
  addToFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";
import {
  deleteFavourite,
  setFavourite,
} from "../../config/services/firebase/favourite";
import { setCart } from "../../config/services/firebase/cart";
import homeBannar from "../../assets/home-bannar.jpg";

const Home = ({
  loaderFetchAPI,
  currentUserID,
  handleFetchMoreData,
  items,
  hasMore,
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

  const { productData } = useSelector((state) => state.data);
  const { cart } = useSelector((stata) => stata.addToCart);
  const { favourite } = useSelector((stata) => stata.addToFavourite);

  console.log(productData);

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
    setAddToFavouriteLoader(true);
    if (currentUserID) {
      //user is login
      try {
        await deleteFavourite(currentProductData, currentUserID, favourite);
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
    setCurrentColor("");
    setCurrentPrice("");
    setCurrentSize("");
  }, [open]);

  return (
    <>
      {loaderFetchAPI ? (
        <HeroSectionSkeleton />
      ) : (
        <>
          <HeroSection
            title="We have 50% discounts"
            backgroundImage={homeBannar}
          />
        </>
      )}
      <div className="px-4 md:p-8 lg:p-10 pt-5">
        {loaderFetchAPI ? (
          <>
            <SingleDetailCardSkeleton />
            <div className="flex flex-wrap -mx-4">
              <CartProductSkeleton />
              <CartProductSkeleton />
              <CartProductSkeleton />
              <CartProductSkeleton />
            </div>
          </>
        ) : (
          Object.keys(productData).map((category, ind) => {
            return (
              <div key={ind} className="space-y-4 mb-16">
                <h2 className="font-bold md:text-3xl text-lg capitalize pb-3">
                  {category}
                </h2>
                <SingleDetailCard
                  productData={productData[category]}
                  favourite={favourite}
                  addToFavouriteLoader={addToFavouriteLoader}
                  handleModal={handleModal}
                  handleFavourite={handleFavourite}
                  handleRemoveFavourite={handleRemoveFavourite}
                />
                <div className="flex flex-wrap -mx-4">
                  {productData[category].slice(1).map((product, productIND) => {
                    return (
                      <div
                        className="w-full sm:w-1/2 md:w-1/4 px-4"
                        key={productIND}
                      >
                        <CartProduct
                          productData={product}
                          favourite={favourite}
                          addToFavouriteLoader={addToFavouriteLoader}
                          handleModal={handleModal}
                          handleFavourite={handleFavourite}
                          handleRemoveFavourite={handleRemoveFavourite}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="px-4 md:p-8 lg:px-10 myCustomPadding">
        <InfiniteScroll
          dataLength={Object.keys(items).length}
          next={handleFetchMoreData}
          hasMore={hasMore}
          loader={
            <>
              <SingleDetailCardSkeleton />
              <div className="flex flex-wrap -mx-4">
                <CartProductSkeleton />
                <CartProductSkeleton />
                <CartProductSkeleton />
                <CartProductSkeleton />
              </div>
            </>
          }
        >
          {Object.keys(items).map((category, ind) => {
            return (
              <div key={ind} className="space-y-4 mb-16">
                <h2 className="font-bold md:text-3xl text-lg capitalize pb-3">
                  {category}
                </h2>
                <SingleDetailCard
                  productData={items[category]}
                  favourite={favourite}
                  addToFavouriteLoader={addToFavouriteLoader}
                  handleModal={handleModal}
                  handleFavourite={handleFavourite}
                  handleRemoveFavourite={handleRemoveFavourite}
                />
                <div className="flex flex-wrap -mx-4">
                  {items[category].slice(1).map((product, productIND) => {
                    return (
                      <div
                        className="w-full sm:w-1/2 md:w-1/4 px-4"
                        key={productIND}
                      >
                        <CartProduct
                          productData={product}
                          favourite={favourite}
                          addToFavouriteLoader={addToFavouriteLoader}
                          handleModal={handleModal}
                          handleFavourite={handleFavourite}
                          handleRemoveFavourite={handleRemoveFavourite}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>

      <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
        <CardProductDetails
          currentProductData={currentProductData}
          handleCurrentSizes={handleCurrentSizes}
          hanldeCurrentColor={hanldeCurrentColor}
          handleAddToCart={handleAddToCart}
          handleSetCart={handleSetCart}
          currentPrice={currentPrice}
          currentColor={currentColor}
        />
      </Modal>
    </>
  );
};

export default Home;
