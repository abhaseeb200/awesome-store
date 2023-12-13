const CardProductDetailsSkeleton = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-6 px-4 md:p-8 lg:p-10 mt-5 animate-pulse">
      <div className="h-full mb-5">
        <div className="bg-gray-300 aspect-[2/1]"></div>
        <ul className="flex h-20 mt-2">
            <li className="bg-gray-300 w-1/4 mr-2"></li>
            <li className="bg-gray-300 w-1/4 mr-2"></li>
            <li className="bg-gray-300 w-1/4 mr-2"></li>
            <li className="bg-gray-300 w-1/4"></li>
        </ul>
      </div>
      <div className="">
        <div className="flex flex-col gap-y-4">
          <h2 className="bg-gray-300 sm:p-5 p-3"></h2>
          <div className="bg-gray-300 sm:p-5 p-3"></div>
          <div className="bg-gray-300 sm:p-5 p-3"></div>
          <div className="bg-gray-300 sm:p-5 p-3"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProductDetailsSkeleton;
