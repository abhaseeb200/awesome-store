import React from "react";
import { LuShoppingBasket } from "react-icons/lu";
import { AiOutlineFullscreen } from "react-icons/ai";

const CartProduct = ({ open, setOpen, productData}) => {
  const handleModal = () => {
    setOpen(true);
  };

  return (
    <div className="">
      <div className="relative m-3 flex flex-wrap mx-auto">
        <div className="relative border max-w-sm bg-white shadow-md rounded-xl p-3 my-3 cursor-pointer group overflow-hidden">
          <div className="relative overflow-hidden">
            <img
              className="h-50 w-full object-cover"
              src={productData.thumbnail}
              alt="Product"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex w-1/2 justify-between">
                <span className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition border p-1 sm:p-4 md:p-5">
                  <LuShoppingBasket />
                </span>
                <span
                  className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition border p-1 sm:p-4 md:p-5"
                  onClick={handleModal}
                >
                  <AiOutlineFullscreen />
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 mb-1 flex justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-0">
               {productData.title}
              </p>
              <p className="text-sm text-gray-500">{productData.categoryName}</p>
              <p className="mt-2 font-semibold">{productData.price}</p>
            </div>
            <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
              {/* Additional content if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
