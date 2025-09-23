const ProductsGridSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsGridSkeleton;