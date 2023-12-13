import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import HeroSection from "../../components/heroSection";
import HeroSectionSkeleton from "../../components/heroSection/skeleton";
import CardProduct from "../../components/cardProduct";
import CartProductSkeleton from "../../components/cardProduct/skeleton";
import CardProductDetails from "../../components/cardProductDetails";
import Modal from "../../components/modal";
import FilterTab from "./component";
import FilterTabSkeleton from "./component/skeleton";
import { addToCartAction } from "../../redux/actions/cartAction";
import {
  addToFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";
import {
  deleteFavourite,
  setFavourite,
} from "../../config/services/firebase/favourite";
import { setCart } from "../../config/services/firebase/cart";
import { generateRandomColors } from "../../config/services/randomGenerators/randomGenerates";
import { munallyDataAction } from "../../redux/actions/dataAction";

const Category = ({ currentUserID }) => {
  const [open, setOpen] = useState(false);
  const [currentSizeTab, setCurrentSizeTab] = useState("");
  const [currentColorTab, setCurrentColorTab] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [addToFavouriteLoader, setAddToFavouriteLoader] = useState(false);
  const [loaderFetchAPI, setLoaderFetchAPI] = useState(true);
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [currentProductData, setCurrentProductData] = useState({});
  const [currentColors, setCurrentColors] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); //use for find repeated categories api
  const [sizes] = useState(["small", "medium", "large"]);
  const [colors] = useState([
    "FloralWhite",
    "LightSkyBlue",
    "DodgerBlue",
    "Tomato",
    "LightGray",
  ]);
  const cancelButtonRef = useRef(null);

  const { title } = useParams();

  const dispatch = useDispatch();

  const { productData } = useSelector((state) => state?.data);
  const { cart } = useSelector((stata) => stata.addToCart);
  const { favourite } = useSelector((stata) => stata.addToFavourite);
  console.log(productData, "STORE");

  const categoryProductsFetch = async () => {
    setLoaderFetchAPI(true);
    let isAlreadyCategory = Object.keys(productData).find(
      (category) => category === title
    );
    if (!isAlreadyCategory) {
      try {
        let response = await axios.get(
          `https://dummyjson.com/products/category/${title}`
        );
        let data = response.data.products;
        let updateData = data.map((item) => {
          return {
            ...item,
            sizes: {
              small: item.price,
              medium: item.price * 0.1 + item.price,
              large: item.price * 0.2 + item.price,
            },
            quantity: 0,
            colors: generateRandomColors(),
          };
        });
        console.log(updateData);
        setCurrentProducts(updateData);
        dispatch(munallyDataAction(productData,updateData,title))

        // let tempProduct = [...updateData, ...allProducts];
        // setAllProducts(tempProduct);
        setLoaderFetchAPI(false);
      } catch (error) {
        console.log(error);
        setLoaderFetchAPI(false);
      }
    } else {
      setCurrentProducts(productData[title]);
      setLoaderFetchAPI(false);
    }
  };

  // const currentCategoryProductsFetch = () => {
  //   let currentCategoryProducts = productData[title];
  //   setCurrentProducts(currentCategoryProducts);
  //   let categoryColors = [];
  //   currentCategoryProducts?.map((product) =>
  //     categoryColors?.push(...product.colors)
  //   );
  //   let removeDuplicationCurrentColors = [...new Set(categoryColors)]; //remove the duplicate colors in array
  //   setCurrentColors(removeDuplicationCurrentColors);
  // };

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  const handleCurrentSizes = (price, size) => {
    setCurrentPrice(price);
    setCurrentSize(size);
  };

  const handleSizeTab = (title) => {
    if (title === currentSizeTab) {
      setCurrentSizeTab("");
    } else {
      setCurrentSizeTab(title);
    }
  };

  const hanldeCurrentColor = (color) => {
    setCurrentColor(color);
  };

  const handleColorTab = (title) => {
    if (title === currentColorTab) {
      setCurrentColorTab("");
      setFilterProducts([]);
    } else {
      let filtered = currentProducts.filter((product) =>
        product?.colors.includes(title)
      );
      console.log(filtered);
      setFilterProducts(filtered);
      setCurrentColorTab(title);
    }
  };

  const handleFavourite = async (currentProductData) => {
    setAddToFavouriteLoader(true);
    let isAlreadyProduct = favourite.find(
      (product) => product.id === currentProductData.id
    );
    if (isAlreadyProduct) {
      toast.error("Item already added!", {
        autoClose: 1500,
      });
    } else {
      if (currentUserID) {
        await setFavourite(currentProductData, currentUserID, favourite);
        dispatch(addToFavouriteAction(currentProductData));
        setAddToFavouriteLoader(false);
        toast.success("Favourite successfully!", {
          autoClose: 1500,
        });
      } else {
        dispatch(addToFavouriteAction(currentProductData));
        setAddToFavouriteLoader(false);
        toast.success("Favourite successfully!", {
          autoClose: 1500,
        });
      }
    }
  };

  const handleRemoveFavourite = async (currentProductData) => {
    setAddToFavouriteLoader(true);
    if (currentUserID) {
      try {
        await deleteFavourite(currentProductData, currentUserID, favourite);
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

  const handleAddToCart = (currentProductData) => {
    let existingCartItem = cart.find(
      (item) =>
        item.id === currentProductData?.id &&
        item.currentSize === currentSize &&
        item.currentColor === currentColor
    );
    if (existingCartItem) {
      toast.error("Item already in cart", {
        autoClose: 1500,
      });
    } else {
      //exist item not found
      let updatedData = {
        ...currentProductData,
        quantity: 1,
        currentSize: currentSize,
        currentColor: currentColor,
        currentPrice: currentPrice,
      };
      if (currentUserID) {
        //user is login
        handleSetCart(updatedData);
      } else {
        //user is login out
        dispatch(addToCartAction(updatedData));
        toast.success("Cart add successfully!", {
          autoClose: 1500,
        });
      }
    }
  };

  const handleSetCart = async (updatedData) => {
    setAddToCartLoader(true);
    try {
      await setCart(updatedData, currentUserID, cart);
      dispatch(addToCartAction(updatedData));
      setAddToCartLoader(false);
      toast.success("Cart add successfully!", {
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
      setAddToCartLoader(false);
    }
  };

  useEffect(() => {
    // currentCategoryProductsFetch();
    setFilterProducts([]);
    setCurrentColorTab("");
    categoryProductsFetch();
  }, [title]);

  useEffect(() => {
    setCurrentColor("");
    setCurrentPrice("");
    setCurrentSize("");
  }, [open]);

  useEffect(() => {
    // currentCategoryProductsFetch();
  }, [productData]);

  return (
    <>
      {loaderFetchAPI ? (
        <HeroSectionSkeleton />
      ) : (
        <HeroSection
          title="We have the best quality"
          backgroundImage="https://res.cloudinary.com/drhzjli1l/image/upload/v1696692681/uysunsd7p05c2xjblkwz.jpg"
        />
      )}
      <div className="p-1 md:p-8 lg:p-10">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 px-4 md:px-0 mb-2">
            <h2 className="sm:text-xl text-md text font-semibold">Sizes</h2>
            <hr className="my-2" />
            <div className="flex gap-2 flex-wrap">
              {loaderFetchAPI ? (
                <>
                  <FilterTabSkeleton />
                  <FilterTabSkeleton />
                  <FilterTabSkeleton />
                </>
              ) : (
                sizes.map((size, index) => {
                  return (
                    <FilterTab
                      key={index}
                      title={size}
                      handleFilterTab={handleSizeTab}
                      currentFilterTab={currentSizeTab}
                    />
                  );
                })
              )}
            </div>
            <h2 className="sm:text-xl text-md font-semibold mt-10">Colors</h2>
            <hr className="my-2" />
            <div className="flex gap-2 flex-wrap">
              {loaderFetchAPI ? (
                <>
                  <FilterTabSkeleton />
                  <FilterTabSkeleton />
                  <FilterTabSkeleton />
                </>
              ) : (
                colors.map((color, index) => {
                  return (
                    <FilterTab
                      key={index}
                      title={color}
                      handleFilterTab={handleColorTab}
                      currentFilterTab={currentColorTab}
                    />
                  );
                })
              )}
            </div>
          </div>
          <div className="w-full md:w-3/4 flex flex-wrap">
            {loaderFetchAPI ? (
              <>
                <CartProductSkeleton />
                <CartProductSkeleton />
                <CartProductSkeleton />
                <CartProductSkeleton />
              </>
            ) : filterProducts.length > 0 ? (
              filterProducts.map((product, index) => {
                return (
                  <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-3">
                    <CardProduct
                      productData={product}
                      handleModal={handleModal}
                      favourite={favourite}
                      handleFavourite={handleFavourite}
                      handleRemoveFavourite={handleRemoveFavourite}
                      addToFavouriteLoader={addToFavouriteLoader}
                    />
                  </div>
                );
              })
            ) : (
              currentProducts?.map((product, index) => {
                return (
                  <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-3">
                    <CardProduct
                      productData={product}
                      handleModal={handleModal}
                      favourite={favourite}
                      handleFavourite={handleFavourite}
                      handleRemoveFavourite={handleRemoveFavourite}
                      addToFavouriteLoader={addToFavouriteLoader}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
        <CardProductDetails
          currentProductData={currentProductData}
          handleCurrentSizes={handleCurrentSizes}
          hanldeCurrentColor={hanldeCurrentColor}
          handleAddToCart={handleAddToCart}
          handleSetCart={handleSetCart}
          currentPrice={currentPrice}
          currentColor={currentColor}
          addToCartLoader={addToCartLoader}
        />
      </Modal>
      ;
    </>
  );
};

export default Category;
