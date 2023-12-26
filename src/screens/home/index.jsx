import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import HeroSection from "../../components/heroSection";
import HeroSectionSkeleton from "../../components/heroSection/skeleton";
import CartProduct from "../../components/cardProduct";
import CartProductSkeleton from "../../components/cardProduct/skeleton";
import SingleDetailCardSkeleton from "./component/skeleton";
import SingleDetailCard from "./component/index";
import ProductDetailsModal from "../../components/modal/productDetailsModal";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  addToFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";
import {
  deleteFavourite,
  setFavourite,
} from "../../config/services/firebase/favourite";
import homeBannar from "../../assets/home-bannar.jpg";
import { dataAction } from "../../redux/actions/dataAction";
import axios from "axios";
import {
  generateRandomColors,
  getRandomSizes,
} from "../../config/services/randomGenerators/randomGenerates";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [currentProductData, setCurrentProductData] = useState({});
  const [addToFavouriteLoader, setAddToFavouriteLoader] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { productData } = useSelector((state) => state.data);
  const { skipData } = useSelector((state) => state.data);
  const { totalData } = useSelector((state) => state.data);
  const { favourite } = useSelector((stata) => stata.addToFavourite);
  const { userID } = useSelector((state) => state.user);

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  const handleFavourite = async (currentProductData) => {
    setCurrentID(currentProductData.id);
    let isAlreadyProduct = favourite.find(
      (product) => product.id === currentProductData.id
    );
    if (isAlreadyProduct) {
      toast.error("Item already added!", {
        autoClose: 1500,
      });
    } else {
      if (userID) {
        setAddToFavouriteLoader(true);
        await setFavourite(currentProductData, userID, favourite);
        dispatch(addToFavouriteAction(currentProductData));
        toast.success("Favourite successfully!", {
          autoClose: 1500,
        });
        setAddToFavouriteLoader(false);
      } else {
        dispatch(addToFavouriteAction(currentProductData));
        toast.success("Favourite successfully!", {
          autoClose: 1500,
        });
      }
    }
  };

  const handleRemoveFavourite = async (currentProductData) => {
    setCurrentID(currentProductData.id);
    setAddToFavouriteLoader(true);
    if (userID) {
      //user is login
      try {
        await deleteFavourite(currentProductData, userID, favourite);
        dispatch(removeFromFavouriteAction(currentProductData.id));
        setAddToFavouriteLoader(false);
        toast.success("Remove favourite!", {
          autoClose: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      //user is logout
      dispatch(removeFromFavouriteAction(currentProductData.id));
      setAddToFavouriteLoader(false);
      toast.success("Remove favourite!", {
        autoClose: 1500,
      });
    }
  };

  const handleFetch = async () => {
    try {
      let response = await axios.get(
        "https://dummyjson.com/products?limit=10&skip=0"
      );
      let tempCategoryProduct = {};
      response.data.products.map((item) => {
        if (!tempCategoryProduct[item.category]) {
          tempCategoryProduct[item.category] = [];
        }
        tempCategoryProduct[item.category].push(item);
      });
      // console.log(response);
      dispatch(
        dataAction(tempCategoryProduct, response.data.skip, response.data.total)
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleFetchMoreData = async () => {
    if (skipData < totalData) {
      try {
        let response = await axios.get(
          `https://dummyjson.com/products?limit=5&skip=${skipData}`
        );
        let currentProductData = response?.data?.products;
        let currentCategoryName = currentProductData[0].category;
        let updateCurrentProductData = currentProductData.map((item) => {
          return {
            ...item,
            sizes: getRandomSizes(item.price),
            quantity: 0,
            colors: generateRandomColors(),
          };
        });
        let temp = {
          [currentCategoryName]: updateCurrentProductData,
        };
        let combinedObjects = { ...productData, ...temp };
        dispatch(
          dataAction(combinedObjects, response.data.skip, response.data.total)
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (skipData === 0) {
      handleFetch();
    }
  }, []);

  return (
    <>
      {loading ? (
        <HeroSectionSkeleton />
      ) : (
        <>
          <HeroSection
            title="We have 50% discounts"
            backgroundImage={homeBannar}
          />
        </>
      )}

      <div className="px-4 md:p-8 lg:p-10 pt-5">
        <InfiniteScroll
          dataLength={Object.keys(productData).length}
          next={handleFetchMoreData}
          hasMore={hasMore}
          loader={
            <>
              <SingleDetailCardSkeleton />
              <div className="flex flex-wrap -mx-4">
                <CartProductSkeleton />
                <CartProductSkeleton />
                <CartProductSkeleton />
                <CartProductSkeleton />
              </div>
            </>
          }
        >
          {Object.keys(productData).map((category, ind) => {
            return (
              <div key={ind} className="space-y-4 mb-16">
                <h2 className="font-bold md:text-3xl text-lg capitalize pb-3">
                  {category}
                </h2>
                <SingleDetailCard
                  productData={productData[category]}
                  favourite={favourite}
                  addToFavouriteLoader={addToFavouriteLoader}
                  currentID={currentID}
                  handleModal={handleModal}
                  handleFavourite={handleFavourite}
                  handleRemoveFavourite={handleRemoveFavourite}
                />
                <div className="flex flex-wrap -mx-4">
                  {productData[category].slice(1).map((product, productIND) => {
                    return (
                      <div
                        className="w-full sm:w-1/2 md:w-1/4 px-4"
                        key={productIND}
                      >
                        <CartProduct
                          productData={product}
                          favourite={favourite}
                          addToFavouriteLoader={addToFavouriteLoader}
                          currentID={currentID}
                          handleModal={handleModal}
                          handleFavourite={handleFavourite}
                          handleRemoveFavourite={handleRemoveFavourite}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>

      <ProductDetailsModal
        open={open}
        setOpen={setOpen}
        currentProductData={currentProductData}
      />
    </>
  );
};

export default Home;
