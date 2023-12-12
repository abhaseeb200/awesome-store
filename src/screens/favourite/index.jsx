import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CartProduct from "../../components/cardProduct";
import Modal from "../../components/modal";
import CardProductDetails from "../../components/cardProductDetails";
import Loader from "../../components/loader";
import { removeFromFavouriteAction } from "../../redux/actions/favouriteAction";
import { addToCartAction } from "../../redux/actions/cartAction";
import { deleteFavourite } from "../../config/services/firebase/favourite";
import { setCart } from "../../config/services/firebase/cart";

const Favourite = ({ currentUserID, loaderfavourite }) => {
  const [open, setOpen] = useState(false);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [addToFavouriteLoader, setAddToFavouriteLoader] = useState(false);
  const [currentProductData, setCurrentProductData] = useState({});
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");

  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch();

  const { favourite } = useSelector((stata) => stata.addToFavourite);
  const { cart } = useSelector((stata) => stata.addToCart);

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

  useEffect(() => {
    setCurrentColor("");
    setCurrentPrice("");
    setCurrentSize("");
  }, [open]);

  return (
    <div className="px-4 md:p-8 lg:p-10 flex-1 min-h-[700px]">
      <h2 className="font-medium text-3xl sm:py-10 pt-5 ">Favourite</h2>
      <div className="flex flex-wrap -mx-4">
        {loaderfavourite ? (
          <Loader className="justify-center w-full" />
        ) : favourite.length > 0 ? (
          favourite.map((product, index) => {
            return (
              <div className="w-full sm:w-1/2 md:w-1/4 px-4" key={index}>
                <CartProduct
                  productData={product}
                  favourite={favourite}
                  addToFavouriteLoader={addToFavouriteLoader}
                  handleModal={handleModal}
                  handleRemoveFavourite={handleRemoveFavourite}
                />
              </div>
            );
          })
        ) : (
          <p>No items added to favourite</p>
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
