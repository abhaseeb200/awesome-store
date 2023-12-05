import { AiOutlineDelete } from "react-icons/ai";

const CartListCard = ({ item, handleDelete }) => {
  return (
    <li className="py-7 mb-3 px-3 flex gap-x-3 border-b relative hover:bg-gray-50 transition rounded-t-xl ">
      <div className="w-24  md:w-44 aspect-square relative  p-2 border rounded-lg ">
        <div className="flex -w-full h-full relative ">
          <img src={item?.thumbnail} />
        </div>
      </div>
      <div className="flex flex-col py-1 flex-1 gap-y-4  relative">
        <div className="flex justify-between sm:flex-row flex-col sm:items-center">
          <p className="text-md font-semibold">{item?.title}</p>
          <div className="flex items-center">
            <p className="pr-4 text-gray-500">{item?.currentColor}</p>
            <p className="border-neutral-400 border-l pl-4 text-gray-500">
              {item?.currentSize}
            </p>
            <span className="ml-12" onClick={() => handleDelete(item?.id,item?.currentSize,item?.currentColor)}>
              <AiOutlineDelete
                className="bg-rose-500 rounded-lg p-1 hover:bg-rose-400 cursor-pointer"
                color="#fff"
                size="1.5rem"
              />
            </span>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-semibold">${item?.price}</p>
        </div>
      </div>
    </li>
  );
};

export default CartListCard;
