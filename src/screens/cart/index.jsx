import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button";
import CartListCard from "../../components/cartListCard/index.";
import {
  addToCartAction,
  decrementAction,
  emptyCarttAction,
  incrementAction,
  removeFromCartAction,
} from "../../redux/actions/cartAction";
import {
  deleteCart,
  emptryCart,
  orderProcess,
  updateCart,
} from "../../config/services/firebase/cart";
import Loader from "../../components/loader";
import { toast } from "react-toastify";
import { useState } from "react";
import { TbLoader2 } from "react-icons/tb";

const Cart = ({ loaderCart, currentUserID }) => {
  const [checkoutLoader, setCheckoutLoader] = useState(false);
  const [incrementLoader, setIncrementLoader] = useState(false);
  const [decrementLoader, setDecrementLoader] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [currentColor, setCurrentColor] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const { cart } = useSelector((stata) => stata.addToCart);
  let checkoutTotal = 0;

  const dispatch = useDispatch();

  const handleDelete = async (currentID, currentSize, currentColor) => {
    if (currentUserID) {
      try {
        let response = await deleteCart(
          currentUserID,
          currentID,
          currentSize,
          currentColor,
          cart
        );
        dispatch(removeFromCartAction(currentID, currentSize, currentColor));
        toast.success("Remove successfully!", {
          autoClose: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(removeFromCartAction(currentID, currentSize, currentColor));
      toast.success("Remove successfully!", {
        autoClose: 1500,
      });
    }
  };

  const orderTotal = () => {
    cart.map((item) => (checkoutTotal += item?.currentPrice * item?.quantity));
    return checkoutTotal.toFixed(2);
  };

  const handleCheckout = async () => {
    if (cart.length > 0) {
      if (currentUserID) {
        handleFirebaseEmptyCart();
      } else {
        dispatch(emptyCarttAction());
        toast.success("CheckOut successfully!", {
          autoClose: 1500,
        });
      }
    } else {
      toast.error("Cart is empty!", {
        autoClose: 1500,
      });
    }
  };

  const handleFirebaseEmptyCart = async () => {
    try {
      setCheckoutLoader(true);
      let response = await orderProcess(cart, currentUserID);
      let result = await emptryCart(currentUserID);
      dispatch(emptyCarttAction());
      toast.success("CheckOut successfully!", {
        autoClose: 1500,
      });
      setCheckoutLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityIncrement = async (currentProductData) => {
    setCurrentID(currentProductData?.id);
    setCurrentColor(currentProductData?.currentColor);
    setCurrentSize(currentProductData?.currentSize);
    setIncrementLoader(true);
    if (currentUserID) {
      try {
        let updateQuantity = currentProductData.quantity + 1;
        await updateCart(
          updateQuantity,
          currentProductData,
          currentUserID,
          cart
        );
        // dispatch(incrementAction(currentProductData));
        setIncrementLoader(false);
      } catch (error) {
        console.log(error);
        setIncrementLoader(false);
      }
    } else {
      dispatch(incrementAction(currentProductData));
      setIncrementLoader(false);
    }
  };

  const handleQuantityDecrement = async (currentProductData) => {
    setCurrentID(currentProductData?.id);
    setCurrentColor(currentProductData?.currentColor);
    setCurrentSize(currentProductData?.currentSize);
    setDecrementLoader(true);
    if (currentUserID) {
      try {
        let updateQuantity =
          currentProductData.quantity > 1 ? currentProductData.quantity - 1 : 1;
        await updateCart(
          updateQuantity,
          currentProductData,
          currentUserID,
          cart
        );
        // dispatch(decrementAction(currentProductData));
        setDecrementLoader(false);
      } catch (error) {
        console.log(error);
        setDecrementLoader(false);
      }
    } else {
      dispatch(decrementAction(currentProductData));
      setDecrementLoader(false);
    }
  };

  return (
    <div className="myPadding flex-1 min-h-[700px]">
      <h2 className="font-medium text-3xl py-10">Shopping Cart</h2>
      <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-12 ">
        <div className="lg:col-span-7">
          {loaderCart ? (
            <Loader />
          ) : cart.length > 0 ? (
            cart.map((item, index) => {
              return (
                <div key={index}>
                  <CartListCard
                    item={item}
                    handleDelete={handleDelete}
                    handleQuantityIncrement={handleQuantityIncrement}
                    handleQuantityDecrement={handleQuantityDecrement}
                    incrementLoader={incrementLoader}
                    decrementLoader={decrementLoader}
                    currentID={currentID}
                    currentColor={currentColor}
                    currentSize={currentSize}
                  />
                </div>
              );
            })
          ) : (
            <p>No items added to cart</p>
          )}
        </div>
        <div className="lg:col-span-5 sticky top-2 bg-gray-50 rounded-lg px-4 py-6 sm:lg-6 lg:p-8">
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between p-3 border-t border-neutral-200">
              <p>Order total</p>
              <div className="font-semibold">
                {loaderCart ? "Loading..." : "$" + orderTotal()}
              </div>
            </div>
            {checkoutLoader ? (
              <Button
                className="w-full justify-center"
                disabled="disabled"
              >
                <TbLoader2 size="1.3rem" className="animate-spin" />
              </Button>
            ) : (
              <Button
                name="Checkout"
                className="w-full justify-center"
                onClick={handleCheckout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
