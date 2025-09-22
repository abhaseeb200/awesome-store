import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "..";
import CardProductDetails from "../../cardProductDetails";
import { addToCartAction } from "../../../redux/actions/cartAction";

const ProductDetailsModal = ({
  open,
  setOpen,
  currentProductData,
}) => {
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");

  const dispatch = useDispatch();

  const { cart } = useSelector((stata) => stata.addToCart);
  const { userID } = useSelector((state) => state.user);

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
        // handleSetCart(updatedData);
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
      // await setCart(updatedData, userID, cart);
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
    <Modal open={open} setOpen={setOpen}>
      <CardProductDetails
        handleCurrentSizes={handleCurrentSizes}
        hanldeCurrentColor={hanldeCurrentColor}
        handleAddToCart={handleAddToCart}
        handleSetCart={handleSetCart}
        currentProductData={currentProductData}
        addToCartLoader={addToCartLoader}
        currentPrice={currentPrice}
        currentColor={currentColor}
      />
    </Modal>
  );
};

export default ProductDetailsModal;
