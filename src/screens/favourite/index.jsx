import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CartProduct from "../../components/cardProduct";
import CartProductSkeleton from "../../components/cardProduct/skeleton";
import Modal from "../../components/modal";
import CardProductDetails from "../../components/cardProductDetails";
import {
  addToFavouriteAction,
  emptyFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";
import { addToCartAction } from "../../redux/actions/cartAction";
import {
  deleteFavourite,
  getFavourite,
} from "../../config/services/firebase/favourite";
import { setCart } from "../../config/services/firebase/cart";

const Favourite = () => {
  const [open, setOpen] = useState(false);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);
  const [addToFavouriteLoader, setAddToFavouriteLoader] = useState(false);
  const [currentProductData, setCurrentProductData] = useState({});
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentID, setCurrentID] = useState(null);
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");

  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch();

  const { userID } = useSelector((state) => state.user);
  const { favourite } = useSelector((stata) => stata.addToFavourite);
  const { cart } = useSelector((stata) => stata.addToCart);
  const { productData } = useSelector((state) => state.data);

  const handleRemoveFavourite = async (currentProductData) => {
    setCurrentID(currentProductData.id)
    setAddToFavouriteLoader(true);
    if (userID) {
      //user is login
      try {
        await deleteFavourite(currentProductData, userID, favourite);
        dispatch(removeFromFavouriteAction(currentProductData.id));
        setAddToFavouriteLoader(false);
        toast.success("Remove favourite!", {
          autoClose: 1500,
        });
      } catch (error) {
        console.log(error);
        setAddToFavouriteLoader(false);
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
      if (userID) {
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
      await setCart(updatedData, userID, cart);
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

  const handleGetFavourite = async () => {
    setMainLoader(true);
    try {
      let result = await getFavourite(userID);
      // If the document exists, extract the data
      if (result.exists) {
        dispatch(emptyFavouriteAction());
        let productData = result.data().productData;
        console.log(productData);
        productData.forEach((item) => {
          dispatch(addToFavouriteAction(item));
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMainLoader(false);
    }
  };

  useEffect(() => {
    setCurrentColor("");
    setCurrentPrice("");
    setCurrentSize("");
  }, [open]);

  useEffect(() => {
    if (userID) {
      handleGetFavourite();
    } else {
      setMainLoader(false);
    }
  }, [userID]);

  return (
    <div className="myPadding flex-1 min-h-[700px]">
      <h2 className="font-medium text-3xl sm:py-10 pt-5 ">Favourite</h2>
      <div className="flex flex-wrap -mx-4">
        {mainLoader ? (
          <>
            <CartProductSkeleton />
            <CartProductSkeleton />
            <CartProductSkeleton />
            <CartProductSkeleton />
          </>
        ) : favourite.length > 0 ? (
          favourite.map((product, index) => {
            return (
              <div className="w-full sm:w-1/2 md:w-1/4 px-4" key={index}>
                <CartProduct
                  productData={product}
                  favourite={favourite}
                  addToFavouriteLoader={addToFavouriteLoader}
                  currentID={currentID}
                  handleModal={handleModal}
                  handleRemoveFavourite={handleRemoveFavourite}
                />
              </div>
            );
          })
        ) : (
          <p className="mx-4">No items added to favourite</p>
        )}
      </div>
      <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
        <CardProductDetails
          currentProductData={currentProductData}
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
    </div>
  );
};

export default Favourite;
