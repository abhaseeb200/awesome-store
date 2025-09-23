import React from "react";

const TopCategories = ({ category }) => {
  return (
    <div className="flex flex-col items-center space-y-3 cursor-pointer">
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors">
        <img
          src={category?.thumbnail}
          alt={category?.title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-800 text-center">
        {category?.title}
      </h3>
    </div>
  );
};

export default TopCategories;
