import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../../components/heroSection";
import CardProduct from "../../components/cardProduct";
import CardProductDetails from "../../components/cardProductDetails";
import Modal from "../../components/modal";
import FilterTab from "./components";
import Loader from "../../components/loader";
import { addToCartAction } from "../../redux/actions/cartAction";
import { setCart } from "../../config/services/firebase/cart";
import { toast } from "react-toastify";
import {
  addToFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";
import {
  deleteFavourite,
  setFavourite,
} from "../../config/services/firebase/favourite";

const Category = ({ loader, currentUserID, loaderfavourite }) => {
  const [open, setOpen] = useState(false);
  const [currentSizeTab, setCurrentSizeTab] = useState("");
  const [currentColorTab, setCurrentColorTab] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [currentProductData, setCurrentProductData] = useState({});
  const [currentColors, setCurrentColors] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [sizes, setSizes] = useState(["small", "medium", "large"]);

  const cancelButtonRef = useRef(null);
  const { title } = useParams();

  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state?.data);
  const { cart } = useSelector((stata) => stata.addToCart);
  const { favourite } = useSelector((stata) => stata.addToFavourite);

  const currentCategoryProductsFetch = () => {
    let currentCategoryProducts = productData[title];
    setCurrentProducts(currentCategoryProducts);
    const categoryColors = [];
    currentCategoryProducts?.map((product) =>
      categoryColors?.push(...product.colors)
    );
    const currentColorstemp = [...new Set(categoryColors)];
    setCurrentColors(currentColorstemp);
  };

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  const handleCurrentSizes = (price, size) => {
    console.log(size);
    setCurrentPrice(price);
    setCurrentSize(size);
  };

  const hanldeCurrentColor = (color) => {
    setCurrentColor(color);
  };

  const handleFavourite = async (currentProductData) => {
    let isAlreadyProduct = favourite.find(
      (product) => product.id === currentProductData.id
    );
    if (isAlreadyProduct) {
      toast.error("Item already added!", {
        autoClose: 1500,
      });
    } else {
      if (currentUserID) {
        let response = await setFavourite(
          currentProductData,
          currentUserID,
          favourite
        );
        console.log(response);
        dispatch(addToFavouriteAction(currentProductData));
        toast.success("Favourite successfully!", {
          autoClose: 1500,
        });
      } else {
        dispatch(addToFavouriteAction(currentProductData));
        toast.success("Favourite successfully!", {
          autoClose: 1500,
        });
      }
    }
  };

  const handleRemoveFavourite = async (currentProductData) => {
    if (currentUserID) {
      //user is login
      try {
        let result = await deleteFavourite(
          currentProductData,
          currentUserID,
          favourite
        );
        dispatch(removeFromFavouriteAction(currentProductData.id));
        toast.success("Remove favourite!", {
          autoClose: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      //user is logout
      dispatch(removeFromFavouriteAction(currentProductData.id));
      toast.success("Remove favourite!", {
        autoClose: 1500,
      });
    }
  };

  const handleSetCart = async (currentProductData) => {
    setAddToCartLoader(true);
    let updatedData = {
      ...currentProductData,
      quantity: 1,
      currentSize: currentSize,
      currentColor: currentColor,
      currentPrice: currentPrice,
    };
    try {
      let response = await setCart(updatedData, currentUserID, cart);
      dispatch(addToCartAction(updatedData));
      toast.success("Cart add successfully!", {
        autoClose: 1500,
      });
      setAddToCartLoader(false);
    } catch (error) {
      console.log(error);
      setAddToCartLoader(false);
    }
  };

  const handleAddToCart = (currentProductData) => {
    console.log(cart);
    const existingCartItem = cart.find(
      (item) =>
        item.id === currentProductData.id &&
        item.currentSize === currentSize &&
        item.currentColor === currentColor
    );
    if (existingCartItem) {
      toast.error("Item already in cart", {
        autoClose: 1500,
      });
    } else {
      //user is login
      if (currentUserID) {
        handleSetCart(currentProductData);
      } else {
        //user is login out
        let updatedData = {
          ...currentProductData,
          quantity: 1,
          currentSize: currentSize,
          currentColor: currentColor,
          currentPrice: currentPrice,
        };
        dispatch(addToCartAction(updatedData));
        toast.success("Cart add successfully!", {
          autoClose: 1500,
        });
      }
    }
  };

  const handleSizeTab = (title) => {
    if (title === currentSizeTab) {
      setCurrentSizeTab("");
    } else {
      setCurrentSizeTab(title);
    }
  };

  const handleColorTab = (title) => {
    if (title === currentColorTab) {
      setCurrentColorTab("");
      setFilterProducts([]);
    } else {
      const filtered = currentProducts.filter((product) =>
        product?.colors.includes(title)
      );
      setFilterProducts(filtered);
      setCurrentColorTab(title);
    }
  };

  useEffect(() => {
    currentCategoryProductsFetch();
    setFilterProducts([]);
    setCurrentColorTab("");
  }, [title]);

  useEffect(() => {
    setCurrentColor("");
    setCurrentPrice("");
    setCurrentSize("");
  }, [open]);

  useEffect(() => {
    currentCategoryProductsFetch();
  }, [productData]);

  return (
    <>
      <HeroSection
        title="We have the best quality"
        backgroundImage="https://res.cloudinary.com/drhzjli1l/image/upload/v1696692681/uysunsd7p05c2xjblkwz.jpg"
      />
      <div className="p-1 md:p-8 lg:p-10">
        {loader ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 px-4 md:px-0 mb-2">
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
            <div className="w-full md:w-3/4 flex flex-wrap">
              {filterProducts.length > 0
                ? filterProducts.map((product, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full sm:w-1/2 md:w-1/3 px-3"
                      >
                        <CardProduct
                          productData={product}
                          handleModal={handleModal}
                          favourite={favourite}
                          handleFavourite={handleFavourite}
                          handleRemoveFavourite={handleRemoveFavourite}
                          loaderfavourite={loaderfavourite}
                        />
                      </div>
                    );
                  })
                : currentProducts?.map((product, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full sm:w-1/2 md:w-1/3 px-3"
                      >
                        <CardProduct
                          productData={product}
                          handleModal={handleModal}
                          favourite={favourite}
                          handleFavourite={handleFavourite}
                          handleRemoveFavourite={handleRemoveFavourite}
                          loaderfavourite={loaderfavourite}
                        />
                      </div>
                    );
                  })}
            </div>
          </div>
        )}
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
