const CartListCardSkeleton = () => {
  return (
    <li className="py-7 mb-3 px-3 flex gap-x-3 border-b relative rounded-t-xl animate-pulse">
      <div className="w-24  md:w-44 aspect-square relative  p-2 border rounded-lg bg-gray-300">
        <div className="flex -w-full h-full relative"></div>
      </div>
      <div className="flex py-1 flex-1 flex-col gap-y-4">
        <div className="bg-gray-300 sm:p-4 p-2"></div>
        <div className="bg-gray-300 sm:p-4 p-2"></div>
        <div className="bg-gray-300 sm:p-4 p-2"></div>
      </div>
    </li>
  );
};

export default CartListCardSkeleton;
