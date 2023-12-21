import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Home from "../../screens/home";
import Cart from "../../screens/cart";
import ProductDetail from "../../screens/productDetail";
import Category from "../../screens/category";
import Search from "../../screens/search";
import Favourite from "../../screens/favourite";
import Orders from "../../screens/orders";
import OrderProducts from "../../screens/orderProducts";
import { dataAction } from "../../redux/actions/dataAction";
import {
  addToCartAction,
  emptyCarttAction,
} from "../../redux/actions/cartAction";
import {
  addToFavouriteAction,
  emptyFavouriteAction,
} from "../../redux/actions/favouriteAction";
import { authState } from "../services/firebase/auth";
import { getCart } from "../services/firebase/cart";
import { getFavourite } from "../services/firebase/favourite";
import { getOrder } from "../services/firebase/order";
import {
  generateRandomColors,
  getRandomSizes,
} from "../services/randomGenerators/randomGenerates";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loaderFetchAPI, setLoaderFetchAPI] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [loaderCart, setLoaderCart] = useState(true);
  const [loaderfavourite, setLoaderfavourite] = useState(true);
  const [loaderOrder, setLoaderOrder] = useState(true);
  const [currentUserID, setCurrentUserID] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsWithoutStore, setProductsWithoutStore] = useState({});
  const [index, setIndex] = useState(10);
  const [items, setItems] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [productsOrder, setProductsOrder] = useState([]);

  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();

  const { productData } = useSelector((state) => state.data);

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
      dispatch(dataAction(tempCategoryProduct));
      setLoaderFetchAPI(false);
      setTotalProducts(response.data.total);
    } catch (error) {
      setLoaderFetchAPI(false);
    }
  };

  const handleFetchMoreData = async () => {
    if (index < totalProducts) {
      try {
        let response = await axios.get(
          `https://dummyjson.com/products?limit=5&skip=${index}`
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
        let combinedObjects = { ...items, ...temp };
        setItems(combinedObjects);
      } catch (error) {
        console.log(error);
      }
      setIndex((prevIndex) => prevIndex + 10);
    } else {
      setHasMore(false);
    }
  };

  const handleAuthState = async () => {
    try {
      authState((user) => {
        if (user) {
          setIsUser(true);
          setCurrentUserID(user.uid);
          dispatch(emptyFavouriteAction());
          dispatch(emptyCarttAction());
        } else {
          setIsUser(false);
          setCurrentUserID("");
          setLoaderCart(false);
          setLoaderfavourite(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCart = async () => {
    if (currentUserID) {
      try {
        let result = await getCart(currentUserID);
        if (result.exists) {
          let response = result.data().productData;
          response.forEach((item) => {
            dispatch(addToCartAction(item));
          });
        }
        setLoaderCart(false);
      } catch (error) {
        console.log(error);
        setLoaderCart(false);
      }
    }
  };

  const handleGetFavourite = async () => {
    if (currentUserID) {
      try {
        let result = await getFavourite(currentUserID);
        if (result.exists) {
          // If the document exists, extract the data
          let productsID = result.data().productsID;
          //Products ID are in firebase, that why we need to filter with redux products
          Object.keys(productData).forEach((category) => {
            productsID?.forEach((itemID) => {
              let obj = productData[category]?.find(
                (product) => product.id === itemID
              );

              if (obj) {
                dispatch(addToFavouriteAction(obj));
              }
            });
          });
          setLoaderfavourite(false);
        }
      } catch (error) {
        console.log(error);
        setLoaderfavourite(false);
      }
    }
  };

  const handleGetOrders = async () => {
    try {
      let response = await getOrder(currentUserID);
      let temp = [];
      response.forEach((product) => {
        temp.push(product.data());
        console.log(temp,"TEMPPPP");
        setProductsOrder(temp);
      });
      setLoaderOrder(false);
    } catch (error) {
      setLoaderOrder(false);
      console.log(error);
    }
  };

  const handleModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    handleFetch();
    handleAuthState();
  }, []);

  useEffect(() => {
    handleGetCart();
    handleGetFavourite();
    handleGetOrders();
  }, [currentUserID]);

  return (
    <>
      <Router>
        <Navbar
          setIsUser={setIsUser}
          isUser={isUser}
          handleModal={handleModal}
          openModal={openModal}
          setOpenModal={setOpenModal}
          cancelButtonRef={cancelButtonRef}
        />
        <ToastContainer position="top-center" />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loaderFetchAPI={loaderFetchAPI}
                currentUserID={currentUserID}
                items={items}
                handleFetchMoreData={handleFetchMoreData}
                hasMore={hasMore}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetail
                loaderFetchAPI={loaderFetchAPI}
                currentUserID={currentUserID}
                productsWithoutStore={productsWithoutStore}
                setProductsWithoutStore={setProductsWithoutStore}
              />
            }
          />
          <Route
            path="/category/:title"
            element={
              <Category
                loaderFetchAPI={loaderFetchAPI}
                currentUserID={currentUserID}
                productsWithoutStore={productsWithoutStore}
                setProductsWithoutStore={setProductsWithoutStore}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                currentUserID={currentUserID}
                loaderCart={loaderCart}
                openModal={openModal}
                cancelButtonRef={cancelButtonRef}
                setProductsOrder={setProductsOrder}
                handleModal={handleModal}
                setOpenModal={setOpenModal}
                handleGetOrders={handleGetOrders}
              />
            }
          />
          <Route
            path="/favourite"
            element={
              <Favourite
                currentUserID={currentUserID}
                loaderfavourite={loaderfavourite}
              />
            }
          />
          <Route
            path="/search"
            element={
              <Search
                currentUserID={currentUserID}
                loaderFetchAPI={loaderFetchAPI}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <Orders
                currentUserID={currentUserID}
                loaderFetchAPI={loaderFetchAPI}
                productsOrder={productsOrder}
                loaderOrder={loaderOrder}
              />
            }
          />
          <Route
            path="/orders/:orderID"
            element={
              <OrderProducts
                currentUserID={currentUserID}
                loaderFetchAPI={loaderFetchAPI}
                productsOrder={productsOrder}
                loaderOrder={loaderOrder}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Main;
