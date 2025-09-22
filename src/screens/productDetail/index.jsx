import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import CardProductDetails from "../../components/cardProductDetails";
import CardProductDetailsSkeleton from "../../components/cardProductDetails/skeleton";
import CartProduct from "../../components/cardProduct";
import CartProductSkeleton from "../../components/cardProduct/skeleton";
import ProductDetailsModal from "../../components/modal/productDetailsModal";
import { addToCartAction } from "../../redux/actions/cartAction";
import { categoryDataAction } from "../../redux/actions/categoryDataAction";
import {
  addToFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";

const ProductDetail = () => {
  const [open, setOpen] = useState(false);
  const [loaderFetchAPI, setLoaderFetchAPI] = useState(true);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [addToFavouriteLoader, setAddToFavouriteLoader] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [currentProductData, setCurrentProductData] = useState({});
  const [currentProduct, setCurrentProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const dispatch = useDispatch();

  const { productData } = useSelector((state) => state.categoryData);
  const { cart } = useSelector((stata) => stata.addToCart);
  const { favourite } = useSelector((stata) => stata.addToFavourite);
  const { userID } = useSelector((state) => state.user);

  const { id } = useParams();

  const handleFetchProduct = async () => {
    //Product Without Store purpose: no hit already api
    setLoaderFetchAPI(true);
    let foundProduct;
    Object.keys(productData).forEach((category) => {
      let isProduct = productData[category].find((product) => product.id == id);
      if (isProduct) {
        foundProduct = isProduct;
        return;
      }
    });

    if (foundProduct) {
      setCurrentProduct(foundProduct);
      let relatedProductsTemp = productData[foundProduct.category]?.filter(
        (i) => {
          return i.id !== +id;
        }
      );
      setRelatedProducts(relatedProductsTemp);
      setLoaderFetchAPI(false);
    } else {
      //if product is not found in productsWithoutStore, then hit new api to get product.
      //then get their category for related products
      try {
        let response = await axios.get(`https://dummyjson.com/products/${id}`);
        let dataProduct = response.data;
        let responseCategoryProduct = await axios.get(
          `https://dummyjson.com/products/category/${dataProduct.category}`
        );
        let updatedCategoryData = responseCategoryProduct.data.products.map(
          (product) => {
            return {
              ...product,
              // sizes: getRandomSizes(product.price),
              quantity: 0,
              // colors: generateRandomColors(),
            };
          }
        );
        let relatedProductsTemp = updatedCategoryData.filter(
          (i) => i.id !== +id
        );
        let currentProductTemp = updatedCategoryData.find((i) => i.id == +id);
        setCurrentProduct(currentProductTemp);
        setRelatedProducts(relatedProductsTemp);
        let temp = {
          [dataProduct.category]: updatedCategoryData,
        };
        let combinedData = { ...productData, ...temp };
        dispatch(categoryDataAction(combinedData));
        setLoaderFetchAPI(false);
      } catch (error) {
        console.log(error);
        setLoaderFetchAPI(false);
      }
    }
  };

  const handleCurrentSizes = (price, size) => {
    setCurrentPrice(price);
    setCurrentSize(size);
  };

  const hanldeCurrentColor = (color) => {
    setCurrentColor(color);
  };

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
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
    setCurrentID(currentProductData.id);
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
        // await setFavourite(currentProductData, userID, favourite);
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
    setCurrentID(currentProductData.id);
    setAddToFavouriteLoader(true);
    if (userID) {
      //user is login
      try {
        // let result = await deleteFavourite(
        //   currentProductData,
        //   userID,
        //   favourite
        // );
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
    setCurrentPrice("");
    setCurrentColor("");
    setCurrentSize("");
    window.scrollTo(0, 0);
    handleFetchProduct();
  }, [id]);

  return (
    <>
      {loaderFetchAPI ? (
        <>
          <CardProductDetailsSkeleton />
          <hr className="my-8 border-t" />
          <div className="px-4 md:p-8 lg:p-10">
            <div className="flex flex-wrap -mx-4">
              <CartProductSkeleton />
              <CartProductSkeleton />
              <CartProductSkeleton />
              <CartProductSkeleton />
            </div>
          </div>
        </>
      ) : (
        <>
          <CardProductDetails
            setCurrentPrice={setCurrentPrice}
            handleCurrentSizes={handleCurrentSizes}
            handleAddToCart={handleAddToCart}
            hanldeCurrentColor={hanldeCurrentColor}
            handleSetCart={handleSetCart}
            currentPrice={currentPrice}
            currentColor={currentColor}
            currentProductData={currentProduct}
            addToCartLoader={addToCartLoader}
          />
          <hr className="my-8 border-t" />
          <div className="px-4 md:p-8 lg:p-10">
            <h2 className="font-bold text-xl md:text-3xl">Related products</h2>
            <div className="flex flex-wrap -mx-4 pb-6">
              {relatedProducts.map((product, index) => {
                return (
                  <div className="w-full sm:w-1/2 md:w-1/4 px-4" key={index}>
                    <CartProduct
                      handleModal={handleModal}
                      handleFavourite={handleFavourite}
                      currentID={currentID}
                      handleRemoveFavourite={handleRemoveFavourite}
                      favourite={favourite}
                      productData={product}
                      addToFavouriteLoader={addToFavouriteLoader}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <ProductDetailsModal
        open={open}
        setOpen={setOpen}
        currentProductData={currentProductData}
      />
    </>
  );
};

export default ProductDetail;
