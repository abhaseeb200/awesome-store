import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CartProduct from "../../components/cardProduct";
import Modal from "../../components/modal";
import CardProductDetails from "../../components/cardProductDetails";
import SortingProducts from "../../components/sortingProducts";
import CartProductSkeleton from "../../components/cardProduct/skeleton";
import {
  addToFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";
import { addToCartAction } from "../../redux/actions/cartAction";
import {
  deleteFavourite,
  setFavourite,
} from "../../config/services/firebase/favourite";
import { setCart } from "../../config/services/firebase/cart";

const Search = () => {
  const [sortingProducts, setSortingProducts] = useState([]);
  const [fetchLoader, setFetchLoader] = useState(false);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [addToFavouriteLoader, setAddToFavouriteLoader] = useState(false);
  const [currentProductData, setCurrentProductData] = useState({});
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [sortingValue, setSortingValue] = useState("");
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const { searchProducts } = useSelector((state) => state.search);
  const { favourite } = useSelector((stata) => stata.addToFavourite);
  const { cart } = useSelector((stata) => stata.addToCart);
  const { userID } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleCurrentSearch = () => {
    let currentURL = searchProducts.url;
    let currentSearch = currentURL?.split("q=")[1];
    return currentSearch;
  };

  const handleSorting = (e) => {
    let val = e.target.value;
    setSortingValue(val);
    let currentProducts = searchProducts.products;
    let sortData;
    if (val === "lowToHighPrice") {
      sortData = [...currentProducts].sort((a, b) => a.price - b.price);
    } else if (val === "highToLowPrice") {
      sortData = [...currentProducts].sort((a, b) => b.price - a.price);
    } else if (val === "AToZ") {
      sortData = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (val === "ZToA") {
      sortData = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    } else {
      sortData = currentProducts;
    }
    setSortingProducts(sortData);
  };

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  const handleCurrentSizes = (price, size) => {
    setCurrentPrice(price);
    setCurrentSize(size);
  };

  const hanldeCurrentColor = (color) => {
    setCurrentColor(color);
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
      if (userID) {
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
      await setCart(updatedData, userID, cart);
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
      if (userID) {
        let response = await setFavourite(
          currentProductData,
          userID,
          favourite
        );
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
    if (userID) {
      //user is login
      try {
        let result = await deleteFavourite(
          currentProductData,
          userID,
          favourite
        );
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

  useEffect(() => {
    setCurrentColor("");
    setCurrentPrice("");
    setCurrentSize("");
  }, [open]);

  useEffect(() => {
    setSortingProducts(searchProducts.products);
    setSortingValue("");
  }, [searchProducts]);

  return (
    <>
      <div className="myPadding flex-1 min-h-[700px]">
        {fetchLoader ? (
          <>
            <div className="animate-pulse bg-gray-300 p-5 mt-9"></div>
            <div className="flex flex-wrap -mx-4 mt-2">
              <CartProductSkeleton />
              <CartProductSkeleton />
              <CartProductSkeleton />
              <CartProductSkeleton />
            </div>
          </>
        ) : (
          <>
            <h2 className="font-medium text-3xl py-10">
              Search Results for {handleCurrentSearch()}
            </h2>
            {sortingProducts?.length > 1 && (
              <div className="pb-4 flex items-center justify-end">
                <div className="md:w-1/3 w-full">
                  <SortingProducts
                    handleSorting={handleSorting}
                    sortingValue={sortingValue}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-wrap -mx-4">
              {sortingProducts?.length > 0 ? (
                sortingProducts?.map((product, index) => {
                  return (
                    <div className="w-full sm:w-1/2 md:w-1/4 px-4" key={index}>
                      <CartProduct
                        productData={product}
                        favourite={favourite}
                        addToFavouriteLoader={addToFavouriteLoader}
                        handleModal={handleModal}
                        handleFavourite={handleFavourite}
                        handleRemoveFavourite={handleRemoveFavourite}
                      />
                    </div>
                  );
                })
              ) : (
                <p className="mx-4">No search items is found</p>
              )}
            </div>
          </>
        )}
      </div>

      <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
        <CardProductDetails
          currentProductData={currentProductData}
          currentPrice={currentPrice}
          currentColor={currentColor}
          setCurrentPrice={setCurrentPrice}
          handleCurrentSizes={handleCurrentSizes}
          handleAddToCart={handleAddToCart}
          hanldeCurrentColor={hanldeCurrentColor}
          handleSetCart={handleSetCart}
          addToCartLoader={addToCartLoader}
        />
      </Modal>
    </>
  );
};

export default Search;
