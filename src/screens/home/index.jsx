import { useEffect, useRef, useState } from "react";
import HeroSection from "../../components/heroSection";
import homeBannar from "../../assets/home-bannar.jpg";
import CartProduct from "../../components/cardProduct";
import CardProductDetails from "../../components/cardProductDetails";
import Modal from "../../components/modal";
import axios from "axios";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [productsByCategory, setProductsByCategory] = useState({});
  const cancelButtonRef = useRef(null);

  const handleFetch = async () => {
    let response = await axios.get("https://dummyjson.com/products");
    // console.log(response.data, "----");
    let tempCategoryProduct = {};
    response.data.products.map((item) => {
      if (!tempCategoryProduct[item.category]) {
        tempCategoryProduct[item.category] = [];
      }
      tempCategoryProduct[item.category].push(item);
    });
    // console.log(tempCategoryProduct, "+++++");
    setProductsByCategory(tempCategoryProduct);
  };

  console.log(productsByCategory);

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <HeroSection title="We have 50% discounts" backgroundImage={homeBannar} />
      <div className="p-1 md:p-8 lg:p-10 ">
        {Object.keys(productsByCategory).map((category, ind) => {
          return (
            <div key={ind}>
              <h2 className="font-bold text-3xl">{category}</h2>
              <div className="flex flex-wrap -mx-4">
                {productsByCategory[category].map((product, productIND) => {
                  return (
                    <>
                      <div className="w-full sm:w-1/2 md:w-1/5 px-4 mb-4">
                        <CartProduct
                          open={open}
                          setOpen={setOpen}
                          productData={product}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}

        <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
          <CardProductDetails  />
        </Modal>
      </div>
    </>
  );
};

export default Home;
