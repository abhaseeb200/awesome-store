const SingleDetailCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col md:flex-row flex-wrap border p-4 rounded-xl">
      <div className="w-full sm:w-full md:w-1/3 rounded-lg flex-shrink-0 bg-gray-300 aspect-square"></div>
      <div className="w-full sm:w-full md:w-1/3 md:px-5 sm:mb-0 md:mt-8 mt-2">
        <h2 className="sm:p-4 p-2 mb-2 bg-gray-300"></h2>
        <p className="sm:p-4 p-2 bg-gray-300"></p>
      </div>
      <div className="w-full sm:w-full md:w-1/3 flex flex-col md:mt-8 mt-2">
        <div className="mb-2 p-2 sm:p-4 bg-gray-300"></div>
        <div className="sm:p-4 p-2 bg-gray-300"></div>
      </div>
    </div>
  );
};

export default SingleDetailCardSkeleton;
