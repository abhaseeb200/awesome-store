import { AiOutlineFullscreen } from "react-icons/ai";
import { LuShoppingBasket } from "react-icons/lu";

const SingleDetailCard = ({ productData, handleModal }) => {
  let firstProduct = productData[0];
  return (
    <div className=" items-start justify-between  flex border p-3 rounded-xl cursor-pointer group relative md:gap-x-8 toHide">
      <div className="w-1/3 aspect-square relative rounded-lg overflow-hidden flex-shrink-0">
        <div className="bg-black/0 group-hover:bg-black/40 transition rounded-xl w-full h-full absolute inset-0 z-10" />
        <div className="flex items-center justify-center gap-x-8 md:gap-x-14 absolute w-full z-20 bottom-0 sm:bottom-16 group-hover:-translate-y-2 sm:group-hover:-translate-y-8 duration-300 opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
          <span className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition border p-1 sm:p-4 md:p-5">
            <LuShoppingBasket />
          </span>
          <span
            className="flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition border p-1 sm:p-4 md:p-5"
            onClick={() => handleModal(firstProduct)}
          >
            <AiOutlineFullscreen />
          </span>
        </div>
        <img className="object-contain" src={firstProduct.thumbnail} />
      </div>
      <div className="w-1/3 flex flex-col gap-y-2 md:mt-8 ">
        <h2 className="font-bold text-sm md:text-3xl">Description</h2>
        <p className="md:text-lg text-[10px] text-gray-600 line-clamp-4 md:line-clamp-[6] sm:text-justify">
          {firstProduct.description}
        </p>
      </div>
      <div className="flex flex-col gap-y-1 md:gap-y-4 w-1/3  items-center  md:mt-8">
        <div>
          <div className="flex gap-x-2 items-center">
            <p className="font-semibold text-sm md:text-lg ">Size: </p>
            <p className="text-xs md:text-base">Medium</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <p className="font-semibold text-sm md:text-lg ">Color: </p>
            <span
              title="Black"
              style={{ backgroundColor: "#111" }}
              className=" p-1 md:p-3 rounded-full border"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDetailCard;
