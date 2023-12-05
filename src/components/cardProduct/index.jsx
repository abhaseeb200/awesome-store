import React from "react";
import { LuShoppingBasket } from "react-icons/lu";
import { AiOutlineFullscreen } from "react-icons/ai";
import { Link } from "react-router-dom";

const CartProduct = ({ handleModal, productData, index }) => {
  return (
    <div key={index} className="relative m-3 flex flex-wrap mx-auto">
      <Link to={`/product/${productData?.id}`}>
        <div className="relative border max-w-sm bg-white shadow-md rounded-xl p-3 my-3 cursor-pointer group overflow-hidden">
          <div className="absolute z-10 inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100  transition-opacity flex items-center justify-center">
            <div className="flex w-full justify-center">
              {/* <span className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition border p-1 sm:p-4 md:p-5">
                <LuShoppingBasket />
              </span> */}
              <span
                className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 group-hover:-translate-y-2 sm:group-hover:-translate-y-6 transition duration-300 opacity-0 group-hover:opacity-100 border p-1 sm:p-4 md:p-5"
                onClick={(e) => {
                  e.preventDefault();
                  handleModal(productData)
                }}
                
              >
                <AiOutlineFullscreen />
              </span>
            </div>
          </div>
          {/* <Link to={`/product/${productData?.id}`}></Link> */}
          <div className="relative overflow-hidden aspect-square">
            <img
              className="w-full h-full object-contain"
              src={productData?.thumbnail}
              alt="Product"
            />
          </div>
          <div className="mt-4 mb-1 flex justify-between">
            <div>
              <p className="font-semibold text-xs w-full line-clamp-1 text-clip sm:text-lg">
                {productData?.title}
              </p>{" "}
              <p className="text-sm text-gray-500">
                {productData?.categoryName}
              </p>
              <p className="mt-2 font-semibold">${productData?.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CartProduct;
