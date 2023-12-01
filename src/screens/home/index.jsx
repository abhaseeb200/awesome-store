import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import HeroSection from "../../components/heroSection";
import CartProduct from "../../components/cardProduct";
import CardProductDetails from "../../components/cardProductDetails";
import Modal from "../../components/modal";
import SingleDetailCard from "./components/singleDetailCard";
import homeBannar from "../../assets/home-bannar.jpg";
import { dataAction } from "../../redux/actions/dataAction";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [currentProductData, setCurrentProductData] = useState({});
  const cancelButtonRef = useRef(null);

  const productsByCategory = useSelector((state) => state.data.productData);
  console.log(productsByCategory);

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  return (
    <>
      <HeroSection title="We have 50% discounts" backgroundImage={homeBannar} />
      <div className="p-1 md:p-8 lg:p-10 ">
        {Object.keys(productsByCategory).map((category, ind) => {
          return (
            <div key={ind}>
              <h2 className="font-bold text-3xl capitalize">{category}</h2>
              {/* <ProductSlider productsByCategory={productsByCategory[category]}/> */}
              <SingleDetailCard
                productData={productsByCategory[category]}
                handleModal={handleModal}
              />
              <div className="flex flex-wrap -mx-4">
                {productsByCategory[category]
                  .slice(1)
                  .map((product, productIND) => {
                    return (
                      <div
                        className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4"
                        key={productIND}
                      >
                        <CartProduct
                          handleModal={handleModal}
                          productData={product}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}

        <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
          <CardProductDetails currentProductData={currentProductData} />
        </Modal>
      </div>
    </>
  );
};

export default Home;
