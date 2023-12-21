import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
import SortingProducts from "../../components/sortingProducts";
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
import {
  generateRandomColors,
  getRandomSizes,
} from "../../config/services/randomGenerators/randomGenerates";

const Category = ({
  currentUserID,
  productsWithoutStore,
  setProductsWithoutStore,
}) => {
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
  const [currentProducts, setCurrentProducts] = useState([]);
  const [sortingValue, setSortingValue] = useState("");
  const [sizes] = useState(["small", "medium", "large"]);
  const colors = useState([
    "FloralWhite",
    "LightSkyBlue",
    "DodgerBlue",
    "Tomato",
    "LightGray",
  ]);

  const cancelButtonRef = useRef(null);

  const { title } = useParams();

  const dispatch = useDispatch();

  const location = useLocation();

  const { cart } = useSelector((stata) => stata.addToCart);
  const { favourite } = useSelector((stata) => stata.addToFavourite);

  const currentParams = new URLSearchParams(location.search);
  const sizeParams = new URLSearchParams(location.search).get("size");
  const colorParams = new URLSearchParams(location.search).get("color");
  const sortingParams = new URLSearchParams(location.search).get("sorting");

  const categoryProductsFetch = async () => {
    setLoaderFetchAPI(true);
    let isAlreadyCategory = Object.keys(productsWithoutStore).find(
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
            sizes: getRandomSizes(item.price),
            quantity: 0,
            colors: generateRandomColors(),
          };
        });
        let temp = {
          [data[0].category]: updateData,
        };
        let combinedData = { ...productsWithoutStore, ...temp };
        setProductsWithoutStore(combinedData);
        setFilterProducts(updateData);
        setCurrentProducts(updateData);
        setLoaderFetchAPI(false);
      } catch (error) {
        console.log(error);
        setLoaderFetchAPI(false);
      }
    } else {
      console.log(productsWithoutStore, "__________ productsWithoutStore");
      setCurrentProducts(productsWithoutStore[title]);
      setFilterProducts(productsWithoutStore[title]);
      setLoaderFetchAPI(false);
    }
  };

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  const handleCurrentSizes = (price, size) => {
    setCurrentPrice(price);
    setCurrentSize(size);
  };

  const handleSizeTab = (size) => {
    if (size === currentSizeTab) {
      setCurrentSizeTab("");
    } else {
      setCurrentSizeTab(size);
    }
  };

  const hanldeCurrentColor = (color) => {
    setCurrentColor(color);
  };

  const handleColorTab = (title) => {
    if (title === currentColorTab) {
      setCurrentColorTab("");
    } else {
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

  const handleSorting = (e) => {
    let val = e.target.value;
    setSortingValue(val);
  };

  const handleParams = (color, size, sorting) => {
    if (size) {
      currentParams.set("size", size);
    } else {
      currentParams.delete("size");
    }

    if (color) {
      currentParams.set("color", color);
    } else {
      currentParams.delete("color");
    }

    if (sorting && sorting !== "0") {
      currentParams.set("sorting", sorting);
    } else {
      currentParams.delete("sorting");
    }

    const newURL = currentParams.toString()
      ? `${location.pathname}?${currentParams.toString()}`
      : location.pathname;

    history.replaceState({}, "", newURL);

    //applying filteres
    const filtered = currentProducts.filter((product) => {
      if (color && !product.colors.includes(color)) {
        return false;
      }
      if (size && !Object.keys(product.sizes).includes(size)) {
        return false;
      }
      // Product passes all filters
      return true;
    });

    // apply sorting based on the selected sorting option
    let sortedData;
    if (sorting === "lowToHighPrice") {
      sortedData = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sorting === "highToLowPrice") {
      sortedData = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sorting === "AToZ") {
      sortedData = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sorting === "ZToA") {
      sortedData = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    } else {
      sortedData = [...filtered];
    }
    setFilterProducts(sortedData);
  };

  useEffect(() => {
    setFilterProducts([]);
    setCurrentColorTab("");
    setCurrentSizeTab("");
    categoryProductsFetch();
  }, [title]);

  useEffect(() => {
    setCurrentColor("");
    setCurrentPrice("");
    setCurrentSize("");
  }, [open]);

  useEffect(() => {
    //on reload, if filter params has
    handleParams(colorParams, sizeParams, sortingParams);
    setCurrentColorTab(colorParams);
    setCurrentSizeTab(sizeParams);
    setSortingValue(sortingParams);
  }, [currentProducts]);

  useEffect(() => {
    handleParams(currentColorTab, currentSizeTab, sortingValue);
  }, [currentColorTab, currentSizeTab, sortingValue]);

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
            <h2 className="sm:text-xl text-md font-semibold mt-10">Sorting</h2>
            <hr className="my-2" />
            <SortingProducts
              handleSorting={handleSorting}
              sortingValue={sortingValue}
            />
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
              <p className="justify-center flex w-full items-center">
                No results found
              </p>
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
