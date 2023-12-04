import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HeroSection from "../../components/heroSection";
import CardProduct from "../../components/cardProduct";
import CardProductDetails from "../../components/cardProductDetails";
import Modal from "../../components/modal";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [currentProductData, setCurrentProductData] = useState({});

  const cancelButtonRef = useRef(null);
  const { title } = useParams();
  const { productData } = useSelector((state) => state?.data);

  // console.log(productData, "??????????", title);
  const currentProducts = productData[title];
  // console.log(currentProducts, "CURRENT PRODYUCT");

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

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
            <h2 className="text-xl font-semibold">Colors</h2>
            <hr className="my-2" />
          </div>
          <div className="w-3/4 flex flex-wrap">
            {currentProducts?.map((product, index) => {
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
