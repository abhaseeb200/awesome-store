import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HeroSection from "../../components/heroSection";
import CardProduct from "../../components/cardProduct";
import CardProductDetails from "../../components/cardProductDetails";
import Modal from "../../components/modal";
import FilterTab from "./components";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [currentSizeTab, setCurrentSizeTab] = useState("");
  const [currentColorTab, setCurrentColorTab] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [currentProductData, setCurrentProductData] = useState({});

  const sizes = ["small", "medium", "large"];

  const cancelButtonRef = useRef(null);
  const { title } = useParams();
  const { productData } = useSelector((state) => state?.data);

  // console.log(productData, "??????????", title);
  const currentProducts = productData[title];
  // console.log(currentProducts, "CURRENT PRODYUCT");

  const categoryColors = [];
  currentProducts?.map((product) => categoryColors.push(...product.colors));
  const currentColors = [...new Set(categoryColors)];
  // console.log(currentColors, "-----------");

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  const handleSizeTab = (title) => {
    console.log(title, "-------------");
    if (title === currentSizeTab) {
      setCurrentSizeTab("");
      setFilterProducts([]);
    } else {
      setCurrentSizeTab(title);
    }
  };

  const handleColorTab = (title) => {
    console.log(title, "++++++++++++++++++++++++");
    if (title === currentColorTab) {
      setCurrentColorTab("");
      setFilterProducts([]);
    } else {
      const filtered = currentProducts.filter((product) =>
        product?.colors.includes(title)
      );
      console.log(filtered, "===================================");
      setFilterProducts(filtered);
      setCurrentColorTab(title);
    }
  };

  useEffect(() => {
    console.log({ filterProducts }, "HEY IAM USE EFFECT");
    setFilterProducts([]);
    setCurrentColorTab("");
  }, [title]);

  return (
    <>
      <HeroSection
        title="We have the best quality"
        backgroundImage="https://res.cloudinary.com/drhzjli1l/image/upload/v1696692681/uysunsd7p05c2xjblkwz.jpg"
      />
      <div className="p-1 md:p-8 lg:p-10">
        <div className="flex flex-wrap">
          <div className="w-1/4">
            <h2 className="text-xl font-semibold">Sizes</h2>
            <hr className="my-2" />
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size, index) => {
                return (
                  <FilterTab
                    key={index}
                    title={size}
                    handleFilterTab={handleSizeTab}
                    currentFilterTab={currentSizeTab}
                  />
                );
              })}
            </div>
            <h2 className="text-xl font-semibold mt-10">Colors</h2>
            <hr className="my-2" />
            <div className="flex gap-2 flex-wrap">
              {currentColors.map((color, index) => {
                return (
                  <FilterTab
                    key={index}
                    title={color}
                    handleFilterTab={handleColorTab}
                    currentFilterTab={currentColorTab}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-3/4 flex flex-wrap">
            {filterProducts.length > 0
              ? filterProducts.map((product, index) => {
                  return (
                    <div key={index} className="w-1/3 px-3">
                      <CardProduct
                        productData={product}
                        handleModal={handleModal}
                      />
                    </div>
                  );
                })
              : currentProducts?.map((product, index) => {
                  return (
                    <div key={index} className="w-1/3 px-3">
                      <CardProduct
                        productData={product}
                        handleModal={handleModal}
                      />
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
        <CardProductDetails currentProductData={currentProductData} />
      </Modal>
      ;
    </>
  );
};

export default Category;
