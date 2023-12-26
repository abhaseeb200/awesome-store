import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineFullscreen } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { TbLoader2 } from "react-icons/tb";

const CartProduct = ({
  productData,
  index,
  favourite,
  loaderFetchAPI,
  addToFavouriteLoader,
  handleModal,
  currentID,
  handleFavourite,
  handleRemoveFavourite,
}) => {
  let isfavouriteProducts = favourite?.find(
    (product) => product?.id === productData?.id
  );
  return (
    <div key={index} className="relative flex flex-wrap mx-auto">
      <Link to={`/product/${productData?.id}`} className="w-full">
        <div className="relative border bg-white shadow-md rounded-xl p-3 my-3 cursor-pointer group overflow-hidden max-w-full">
          <div className="absolute z-10 inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100  transition-opacity flex items-center justify-center p-3 rounded-xl">
            <div className="flex w-full justify-center gap-2">
              <span
                className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 group-hover:-translate-y-2 sm:group-hover:-translate-y-6 transition duration-300 opacity-0 group-hover:opacity-100 border p-1 sm:p-4 md:p-5"
                onClick={(e) => {
                  e.preventDefault();
                  handleModal(productData);
                }}
              >
                <AiOutlineFullscreen />
              </span>

              {addToFavouriteLoader && currentID === productData?.id ? (
                <span
                  className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 group-hover:-translate-y-2 sm:group-hover:-translate-y-6 transition duration-300 opacity-0 group-hover:opacity-100 border p-1 sm:p-4 md:p-5"
                  onClick={(e) => e.preventDefault()}
                >
                  <TbLoader2 size="1.2rem" className="animate-spin" />
                </span>
              ) : isfavouriteProducts ? (
                <span
                  className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 group-hover:-translate-y-2 sm:group-hover:-translate-y-6 transition duration-300 opacity-0 group-hover:opacity-100 border p-1 sm:p-4 md:p-5"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFavourite(productData);
                  }}
                >
                  <FaHeart color="#ef4444" />
                </span>
              ) : (
                <span
                  className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 group-hover:-translate-y-2 sm:group-hover:-translate-y-6 transition duration-300 opacity-0 group-hover:opacity-100 border p-1 sm:p-4 md:p-5"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFavourite(productData);
                  }}
                >
                  <IoMdHeartEmpty />
                </span>
              )}
            </div>
          </div>
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
              <p className="text-sm text-gray-500">{productData?.category}</p>
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
      </Link>
    </div>
  );
};

export default CartProduct;
