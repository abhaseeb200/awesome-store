import { AiOutlineDelete } from "react-icons/ai";

const CartListCard = () => {
  return (
    <li className="py-7 mb-3 px-3 flex gap-x-3 border-b relative hover:bg-gray-50 transition rounded-t-xl ">
      <div className="w-24  md:w-44 aspect-square relative  p-2 border rounded-lg ">
        <div className="flex -w-full h-full relative ">
          <img />
        </div>
      </div>
      <div className="flex flex-col py-1 flex-1 gap-y-4  relative">
        <div className="flex justify-between sm:flex-row flex-col sm:items-center">
          <p className="text-md font-semibold">New Black Pants</p>
          <div className="flex items-center">
            <p className="pr-4 text-gray-500">Black</p>
            <p className="border-neutral-400 border-l pl-4 text-gray-500">
              Medium
            </p>
            <span className="ml-12">
              <AiOutlineDelete className="bg-rose-500 rounded-lg p-1 hover:bg-rose-400 cursor-pointer" color="#fff" size="1.5rem"/>
            </span>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-semibold">$25.00</p>
        </div>
      </div>
    </li>
  );
};

export default CartListCard;
