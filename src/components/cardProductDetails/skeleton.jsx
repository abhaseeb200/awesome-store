const CardProductDetails = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-8 px-4 md:p-8 lg:p-10 mt-5 animate-pulse">
      <div>
        <h2 className="font-bold text-xl md:text-3xl bg-gray-300"></h2>
        <div className="text-1xl md:text-2xl mt-3">
          <div className="font-semibold"></div>
        </div>
        <hr className="my-6" />
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-2 items-center bg-gray-300">
            <p className="font-semibold">Size: </p>
            <div className="flex"></div>
          </div>
          <div className="flex gap-x-2 items-center bg-gray-300">
            <p className="font-semibold">Color: </p>
          </div>
          <div className="bg-gray-300">
            <h2 className="text-lg font-semibold">Describtion</h2>
            <p className="text-sm text-gray-600 max-h-[300px] overflow-y-auto  pr-2 text-justify"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductDetails;
