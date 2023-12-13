import { TbLoader2 } from "react-icons/tb";
import Button from "../../components/button";

const CheckoutSection = ({
  loaderCart,
  orderTotal,
  handleCheckout,
  checkoutLoader,
}) => {
  return (
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
  );
};

export default CheckoutSection;
