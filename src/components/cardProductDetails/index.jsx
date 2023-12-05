import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/index";
import ThumbnailSlider from "../sliders";
import ColorButton from "../colorButton";

const CardProductDetails = ({
  currentProductData,
  currentPrice,
  currentColor,
  handleCurrentSizes,
  handleAddToCart,
  hanldeCurrentColor,
}) => {
  // console.log(currentProductData, "CURRENT DATA", currentPrice?.price);
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-8 myPadding mt-5">
      <ThumbnailSlider currentProductData={currentProductData} />
      <div>
        <h2 className="text-3xl font-bold">{currentProductData?.title}</h2>
        <div className="text-2xl mt-3">
          <div className="font-semibold">
            ${currentPrice || currentProductData?.sizes?.small}
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-2 items-center">
            <p className="font-semibold">Size: </p>
            <div className="flex">
              {Object.entries(currentProductData?.sizes || {}).map(
                ([size, value], index) => {
                  return (
                    <p
                      className={`${
                        value === currentPrice && "border-black"
                      } px-4 py-1 mr-2 text-center border-2 hover:border-black border-bg-neutral-500 rounded-full bg-neutral-100 cursor-pointer`}
                      key={index}
                      onClick={() => handleCurrentSizes(value, size)}
                    >
                      {size}
                    </p>
                  );
                }
              )}
            </div>
          </div>
          <div className="flex gap-x-2 items-center">
            <p className="font-semibold">Color: </p>
            {currentProductData?.colors?.map((item, index) => {
              return (
                <span
                  onClick={() => hanldeCurrentColor(item)}
                  key={index}
                  style={{ display: "inherit" }}
                  className={`rounded-full border-2 ${
                    item === currentColor && `border-black`
                  }`}
                >
                  <ColorButton title={item} background={item} />
                </span>
              );
            })}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Describtion</h2>
            <p className="text-sm text-gray-600 max-h-[300px] overflow-y-auto  pr-2 text-justify">
              {currentProductData?.description}
            </p>
          </div>
        </div>
        {currentColor && currentPrice ? (
          <Button
            name="Add to cart"
            onClick={() => handleAddToCart(currentProductData)}
          ></Button>
        ) : (
          <Button
            disabled="disabled"
            name="Add to cart"
            onClick={() => handleAddToCart(currentProductData)} 
          ></Button>
        )}
      </div>
    </div>
  );
};

export default CardProductDetails;
