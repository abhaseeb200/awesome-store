import { Link } from "react-router-dom";
import { AiOutlineFullscreen } from "react-icons/ai";
import { TbLoader2 } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";

const SingleDetailCard = ({
  productData,
  favourite,
  addToFavouriteLoader,
  handleModal,
  currentID,
  handleFavourite,
  handleRemoveFavourite,
}) => {
  let firstProduct = productData[0];
  let favouriteProducts = favourite?.find(
    (product) => product?.id === firstProduct?.id
  );
  return (
    <div className="flex flex-col md:flex-row items-start justify-between flex-wrap border p-4 rounded-xl cursor-pointer group relative">
      <Link
        to={`/product/${firstProduct?.id}`}
        className="absolute top-0 lef-0 w-full h-full z-20"
      ></Link>
      <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full gap-5 z-20 group-hover:-translate-y-1 sm:group-hover:-translate-y-4 duration-300 opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
        <span
          className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition border p-1 sm:p-4 md:p-5"
          onClick={(e) => {
            e.preventDefault();
            handleModal(firstProduct);
          }}
        >
          <AiOutlineFullscreen />
        </span>
        {addToFavouriteLoader && currentID === firstProduct?.id ? (
          <span
            className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition border p-1 sm:p-4 md:p-5"
            onClick={(e) => e.preventDefault()}
          >
            <TbLoader2 size="1.2rem" className="animate-spin" />
          </span>
        ) : favouriteProducts ? (
          <span
            className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition border p-1 sm:p-4 md:p-5"
            onClick={(e) => {
              e.preventDefault();
              handleRemoveFavourite(firstProduct);
            }}
          >
            <FaHeart color="#ef4444" />
          </span>
        ) : (
          <span
            className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition border p-1 sm:p-4 md:p-5"
            onClick={(e) => {
              e.preventDefault();
              handleFavourite(firstProduct);
            }}
          >
            <IoMdHeartEmpty />
          </span>
        )}
      </div>
      <div className="bg-black/0 group-hover:bg-black/40 transition rounded-xl w-full h-full absolute inset-0 z-10" />
      <div className="w-full sm:w-full md:w-1/3 relative rounded-lg overflow-hidden flex-shrink-0 mb-4 sm:mb-0 md:mb-0">
        <img
          className="object-contain w-full h-full"
          src={firstProduct.thumbnail}
        />
      </div>
      <div className="w-full sm:w-full md:w-1/3 flex flex-col md:mt-8 md:px-5 mb-4 sm:mb-0 ">
        <h2 className="font-bold text-sm md:text-3xl">Description</h2>
        <p className="md:text-lg text-[10px] text-gray-600 line-clamp-4 md:line-clamp-[6]">
          {firstProduct.description}
        </p>
      </div>
      <div className="w-full sm:w-full md:w-1/3 flex flex-col md:mt-8">
        <div>
          <div className="flex gap-x-2 items-center">
            <p className="font-semibold text-sm md:text-lg ">Size:</p>
            <p className="text-xs md:text-base">
              {Object.keys(firstProduct?.sizes)?.map((size, index) => {
                return (
                  <span key={index} className="mr-2">
                    {size}
                  </span>
                );
              })}
            </p>
          </div>
          <div className="flex gap-x-2 items-center">
            <p className="font-semibold text-sm md:text-lg ">Color: </p>
            {firstProduct?.colors?.map((color, index) => {
              return (
                <span
                  key={index}
                  title={color}
                  style={{ backgroundColor: `${color}` }}
                  className=" p-1 md:p-3 rounded-full border"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDetailCard;
