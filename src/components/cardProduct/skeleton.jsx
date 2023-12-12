const CartProductSkeleton = () => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4 px-4">
      <div className="animate-pulse">
        <div className="border max-w-sm shadow-md rounded-xl p-3 my-3">
          <div className="relative aspect-square bg-gray-300"></div>
          <div className="mt-4 mb-1">
            <div className="w-full">
              <p className="p-2 bg-gray-300"></p>
              <p className="p-2 my-2 bg-gray-300"></p>
              <p className="p-2 bg-gray-300"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductSkeleton;
