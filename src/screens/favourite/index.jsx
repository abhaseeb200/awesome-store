import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CartProduct from "../../components/cardProduct";
import Modal from "../../components/modal";
import CardProductDetails from "../../components/cardProductDetails";
import { removeFromFavouriteAction } from "../../redux/actions/favouriteAction";
import { deleteFavourite } from "../../config/services/firebase/favourite";
import { setCart } from "../../config/services/firebase/cart";
import { addToCartAction } from "../../redux/actions/cartAction";
import Loader from "../../components/loader";

const Favourite = ({ currentUserID, loaderfavourite }) => {
  const [open, setOpen] = useState(false);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentProductData, setCurrentProductData] = useState({});
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const cancelButtonRef = useRef(null);

  const { favourite } = useSelector((stata) => stata.addToFavourite);
  const { cart } = useSelector((stata) => stata.addToCart);

  const dispatch = useDispatch();

  const handleRemoveFavourite = async (currentProductData) => {
    if (currentUserID) {
      //user is login
      try {
        await deleteFavourite(currentProductData, currentUserID, favourite);
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

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  const handleCurrentSizes = (price, size) => {
    setCurrentPrice(price);
    setCurrentSize(size);
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

  const hanldeCurrentColor = (color) => {
    setCurrentColor(color);
  };

  useEffect(() => {
    setCurrentColor("");
    setCurrentPrice("");
    setCurrentSize("");
  }, [open]);

  return (
    <div className="myPadding flex-1 min-h-[700px]">
      <h2 className="font-medium text-3xl py-10">Favourite</h2>
      <div className="flex flex-wrap">
        {loaderfavourite ? (
          <Loader className="justify-center w-full" />
        ) : favourite.length > 0 ? (
          favourite.map((product, index) => {
            return (
              <div className="w-full sm:w-1/2 md:w-1/4 px-4" key={index}>
                <CartProduct
                  productData={product}
                  favourite={favourite}
                  handleModal={handleModal}
                  handleRemoveFavourite={handleRemoveFavourite}
                  loaderfavourite={loaderfavourite}
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
