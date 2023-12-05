import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button";
import CartListCard from "../../components/cartListCard/index.";
import { removeFromCartAction } from "../../redux/actions/cartAction";

const Cart = () => {
  const { cart } = useSelector((stata) => stata.addToCart);

  const dispatch = useDispatch()
  console.log(cart);
  const handleDelete = (currentID,currentSize,currentColor) => {
    // console.log("DELTE",currentID,currentSize);
    dispatch(removeFromCartAction(currentID,currentSize,currentColor))
  }

  return (
    <div className="myPadding flex-1 min-h-[700px]">
      <h2 className="font-medium text-3xl py-10">Shopping Cart</h2>
      <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-12 ">
        <div className="lg:col-span-7">
          {cart.map((item,index) => {
            return (
              <div key={index}>
                <CartListCard
                  item={item}
                  handleDelete={handleDelete}
                />
              </div>
            );
          })}
        </div>
        <div className="lg:col-span-5 sticky top-2 bg-gray-50 rounded-lg px-4 py-6 sm:lg-6 lg:p-8">
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between p-3 border-t border-neutral-200">
              <p>Order total</p>
              <div className="font-semibold">$191.00</div>
            </div>
            <Button name="Checkout" className="w-full justify-center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
