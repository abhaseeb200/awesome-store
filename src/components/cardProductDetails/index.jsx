import { Link } from "react-router-dom";
import Button from "../../components/button/index";
import ThumbnailSlider from "../sliders/thumbnailSlider";

const CardProductDetails = ({ currentProductData }) => {
  console.log(currentProductData, "CURRENT DATA");
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-8 myPadding mt-5">
      <ThumbnailSlider currentProductData={currentProductData} />
      {/* <div className=" flex flex-col-reverse gap-5">
        <div className="grid grid-cols-4 gap-6">
          <button className="ring-2 ring-offset-4 ring-black outline-none rounded-lg w-full aspect-square relative">
            <img
              className="object-contain rounded-lg"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                color: "transparent",
              }}
              src={currentProductData?.thumbnail}
            />
          </button>
        </div>
        <div>
          <div className="w-full aspect-square  border rounded-xl p-2 "></div>
        </div>
      </div> */}
      <div>
        <h2 className="text-3xl font-bold">{currentProductData.title}</h2>
        <div className="text-2xl mt-3">
          <div className="font-semibold">${currentProductData.price}</div>
        </div>
        <hr className="my-6" />
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-2 items-center">
            <p className="font-semibold">Size: </p>
            <p>Large</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <p className="font-semibold">Color: </p>
            <span
              title="Gray"
              style={{ backgroundColor: "#888" }}
              className="p-3 rounded-full border"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Describtion</h2>
            <p className="text-sm text-gray-600 max-h-[300px] overflow-y-auto  mySecondScroll pr-2 text-justify">
              {currentProductData.description}
            </p>
          </div>
        </div>
        <Button name="Add to cart"></Button>
      </div>
    </div>
  );
};

export default CardProductDetails;
