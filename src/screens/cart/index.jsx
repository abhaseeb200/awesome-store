import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button";
import CartListCard from "../../components/cartListCard/index.";
import {
  addToCartAction,
  emptyCarttAction,
  removeFromCartAction,
} from "../../redux/actions/cartAction";
import { deleteCart, orderProcess } from "../../config/services/firebase/cart";
import Loader from "../../components/loader";
import CheckoutForm from "../../components/paymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const Cart = ({ loaderCart, currentUserID }) => {
  const { cart } = useSelector((stata) => stata.addToCart);
  let checkoutTotal = 0;

  const dispatch = useDispatch();
  console.log(cart);
  const handleDelete = async (currentID, currentSize, currentColor, docID) => {
    console.log(docID, "DOCID");
    dispatch(removeFromCartAction(currentID, currentSize, currentColor));
    try {
      let response = await deleteCart(docID);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const orderTotal = () => {
    cart.map((item) => (checkoutTotal += item?.currentPrice));
    return checkoutTotal;
  };

  const handleCheckout = async () => {
    try {
      let response = await orderProcess(cart, currentUserID);
      dispatch(emptyCarttAction());
      toast.success("Cart add successfully!", {
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="myPadding flex-1 min-h-[700px]">
      <h2 className="font-medium text-3xl py-10">Shopping Cart</h2>
      <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-12 ">
        <div className="lg:col-span-7">
          {loaderCart ? (
            <Loader />
          ) : (
            cart.map((item, index) => {
              return (
                <div key={index}>
                  <CartListCard item={item} handleDelete={handleDelete} />
                </div>
              );
            })
          )}
        </div>
        <div className="lg:col-span-5 sticky top-2 bg-gray-50 rounded-lg px-4 py-6 sm:lg-6 lg:p-8">
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between p-3 border-t border-neutral-200">
              <p>Order total</p>
              <div className="font-semibold">
                {loaderCart ? "Loading..." : orderTotal()}
              </div>
            </div>
            <Button
              name="Checkout"
              className="w-full justify-center"
              onClick={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
