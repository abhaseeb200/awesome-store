import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import CartListCard from "../../components/cartListCard/index.";
import CartListCardSkeleton from "../../components/cartListCard/skeleton";
import CheckoutSection from "../../components/checkoutSection";
import CheckoutSectionSkeleton from "../../components/checkoutSection/skeleton";
import { orderProcess } from "../../config/services/firebase/order";
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
  getCart,
  updateCart,
} from "../../config/services/firebase/cart";
import Modal from "../../components/modal";
import Login from "../login";
import Register from "../register";

const Cart = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);
  const [checkoutLoader, setCheckoutLoader] = useState(false);
  const [incrementLoader, setIncrementLoader] = useState(true);
  const [decrementLoader, setDecrementLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [currentColor, setCurrentColor] = useState("");
  const [currentSize, setCurrentSize] = useState("");

  const dispatch = useDispatch();

  const { cart } = useSelector((stata) => stata.addToCart);
  const { userID } = useSelector((state) => state.user);

  const handleDelete = async (currentProductData) => {
    setCurrentID(currentProductData?.id);
    setCurrentColor(currentProductData?.currentColor);
    setCurrentSize(currentProductData?.currentSize);
    setDeleteLoader(true)
    if (userID) {
      try {
        await deleteCart(userID, currentProductData, cart);
        dispatch(removeFromCartAction(currentProductData));
        toast.success("Remove successfully!", {
          autoClose: 1500,
        });
        setDeleteLoader(false)
      } catch (error) {
        console.log(error);
        setDeleteLoader(false)
      }
    } else {
      dispatch(removeFromCartAction(currentProductData));
      toast.success("Remove successfully!", {
        autoClose: 1500,
      });
      setDeleteLoader(false)
    }
  };

  const orderTotal = () => {
    let checkoutTotal = 0;
    cart.map((item) => (checkoutTotal += item?.currentPrice * item?.quantity));
    return checkoutTotal.toFixed(2);
  };

  const handleCheckout = async () => {
    if (cart.length > 0) {
      if (userID) {
        handleFirebaseEmptyCart();
        // handleGetOrders()
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
      await orderProcess(cart, userID);
      await emptryCart(userID);
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
    if (userID) {
      try {
        let updateQuantity = currentProductData.quantity + 1;
        await updateCart(updateQuantity, currentProductData, userID, cart);
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
    if (userID) {
      try {
        let updateQuantity =
          currentProductData.quantity > 1 ? currentProductData.quantity - 1 : 1;
        await updateCart(updateQuantity, currentProductData, userID, cart);
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

  const handleGetCart = async () => {
    setMainLoader(true);
    try {
      let result = await getCart(userID);
      if (result.exists) {
        dispatch(emptyCarttAction());
        let response = await result.data().productData;
        response.forEach((item) => {
          dispatch(addToCartAction(item));
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMainLoader(false);
    }
  };

  useEffect(() => {
    if (userID) {
      handleGetCart();
    } else {
      setMainLoader(false);
    }
  }, [userID]);

  // const stripePromise = loadStripe(
  //   "pk_test_51OKLsnGLwqlmQwFXPS6HETbf0TcWBycqYGxwYQLNhY0w0KM9e4syhKjScfb3UmrZZy5aHAAk17yxrmcCIIAb3CBr00b9WBNNSx"
  // );

  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: "sk_test_51OKLsnGLwqlmQwFXxp0kClXWbvwfXJ5beb7Bwf6sER6U7m8of2ASZxT585CisFdd4e5jkCTGCtt27jz6Yf68Vlcd00yO0IXQ5p",
  // };

  return (
    <div className="myPadding flex-1 min-h-[700px]">
      {/* <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements> */}
      <h2 className="font-medium text-3xl py-10">Shopping Cart</h2>
      <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-12 ">
        <div className="lg:col-span-7">
          {mainLoader ? (
            <>
              <CartListCardSkeleton />
              <CartListCardSkeleton />
            </>
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
                    deleteLoader={deleteLoader}
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
        {mainLoader ? (
          <CheckoutSectionSkeleton />
        ) : (
          <CheckoutSection
            mainLoader={mainLoader}
            checkoutLoader={checkoutLoader}
            orderTotal={orderTotal}
            handleCheckout={handleCheckout}
          />
        )}
      </div>

      <Modal
        open={openModal}
        setOpen={setOpenModal}
        setIsLogin={setIsLogin}
        customMaxWidth="custom-max-width"
      >
        {isLogin ? (
          <Login setIsLogin={setIsLogin} setOpenModal={setOpenModal} />
        ) : (
          <Register setIsLogin={setIsLogin} setOpenModal={setOpenModal} />
        )}
      </Modal>
    </div>
  );
};

export default Cart;
