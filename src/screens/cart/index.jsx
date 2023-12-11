import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { TbLoader2 } from "react-icons/tb";
import Loader from "../../components/loader";
import Button from "../../components/button";
import CartListCard from "../../components/cartListCard/index.";
import {
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
import CheckoutForm from "../../components/checkoutForm";

const Cart = ({ loaderCart, currentUserID, setOpenModal }) => {
  const [checkoutLoader, setCheckoutLoader] = useState(false);
  const [incrementLoader, setIncrementLoader] = useState(false);
  const [decrementLoader, setDecrementLoader] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [currentColor, setCurrentColor] = useState("");
  const [currentSize, setCurrentSize] = useState("");

  const dispatch = useDispatch();

  const { cart } = useSelector((stata) => stata.addToCart);

  const handleDelete = async (currentProductData) => {
    if (currentUserID) {
      try {
        await deleteCart(currentUserID, currentProductData, cart);
        dispatch(removeFromCartAction(currentProductData));
        toast.success("Remove successfully!", {
          autoClose: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(removeFromCartAction(currentProductData));
      toast.success("Remove successfully!", {
        autoClose: 1500,
      });
    }
  };

  const orderTotal = () => {
    let checkoutTotal = 0;
    cart.map((item) => (checkoutTotal += item?.currentPrice * item?.quantity));
    return checkoutTotal.toFixed(2);
  };

  const handleCheckout = async () => {
    if (cart.length > 0) {
      if (currentUserID) {
        handleFirebaseEmptyCart();
      } else {
        toast.error("Please Login!", {
          autoClose: 1500,
        });
        setOpenModal(true);
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
      await orderProcess(cart, currentUserID);
      await emptryCart(currentUserID);
      dispatch(emptyCarttAction());
      setCheckoutLoader(false);
      toast.success("CheckOut successfully!", {
        autoClose: 1500,
      });
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

  // const stripePromise = loadStripe(
  //   "pk_test_51OKLsnGLwqlmQwFXPS6HETbf0TcWBycqYGxwYQLNhY0w0KM9e4syhKjScfb3UmrZZy5aHAAk17yxrmcCIIAb3CBr00b9WBNNSx"
  // );

  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: "sk_test_51OKLsnGLwqlmQwFXxp0kClXWbvwfXJ5beb7Bwf6sER6U7m8of2ASZxT585CisFdd4e5jkCTGCtt27jz6Yf68Vlcd00yO0IXQ5p",
  // };

  return (
    <div className="myPadding flex-1 min-h-[700px]">
      <h2 className="font-medium text-3xl py-10">Shopping Cart</h2>
      {/* <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements> */}
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
                {loaderCart ? (
                  <TbLoader2 size="1rem" className="animate-spin" />
                ) : (
                  "$" + orderTotal()
                )}
              </div>
            </div>
            {checkoutLoader ? (
              <Button className="w-full justify-center" disabled="disabled">
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
