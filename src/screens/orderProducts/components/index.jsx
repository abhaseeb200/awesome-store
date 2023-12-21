import React from "react";
import ColorButton from "../../../components/colorButton";

const CartProductOrder = ({ productData, index, loaderFetchAPI }) => {
  return (
    <div key={index} className="relative flex flex-wrap mx-auto">
      <div className="relative border bg-white shadow-md rounded-xl p-3 my-3 group overflow-hidden max-w-full">
        <div className="relative overflow-hidden aspect-square">
          <img
            className="w-full h-full object-contain"
            src={productData?.thumbnail}
            alt="Product"
          />
        </div>
        <div className="mt-4 mb-1 flex justify-between">
          <div className="w-full">
            <p className="font-semibold w-full line-clamp-1 text-clip text-xm md:text-lg">
              {productData?.title}
            </p>
            <p className="pt-2">
              <span>Category:</span>
              <span className="text-sm text-gray-500 capitalize ml-2">
                {productData?.category}
              </span>
            </p>
            <p className="inline-flex gap-2 pt-2 items-center">
              <span>Color:</span>
              <span className="flex">
                <ColorButton
                  title={productData?.currentColor}
                  background={productData?.currentColor}
                />
              </span>
              <span>Size:</span>
              <span className="text-sm text-gray-500 capitalize">
                {productData?.currentSize}
              </span>
            </p>
            <p className="pt-2">
              <span>Quantity:</span>
              <span className="text-sm text-gray-500 capitalize">
                {productData?.quantity}
              </span>
            </p>
            <p
              className={`mt-2 font-semibold text-xm md:text-lg ${
                loaderFetchAPI ? "bg-gray-300" : ""
              } `}
            >
              ${productData?.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductOrder;
