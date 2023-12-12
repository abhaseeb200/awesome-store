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
import Favourite from "../../screens/favourite";
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
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loaderFetchAPI, setLoaderFetchAPI] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [loaderCart, setLoaderCart] = useState(true);
  const [loaderfavourite, setLoaderfavourite] = useState(true);
  const [currentUserID, setCurrentUserID] = useState("");

  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch();

  const { productData } = useSelector((state) => state.data);

  const handleFetch = async () => {
    try {
      let response = await axios.get("https://dummyjson.com/products");
      let tempCategoryProduct = {};
      response.data.products.map((item) => {
        if (!tempCategoryProduct[item.category]) {
          tempCategoryProduct[item.category] = [];
        }
        tempCategoryProduct[item.category].push(item);
      });
      dispatch(dataAction(tempCategoryProduct));
      setLoaderFetchAPI(false);
    } catch (error) {
      setLoaderFetchAPI(false);
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
            element={<Home loaderFetchAPI={loaderFetchAPI} currentUserID={currentUserID} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetail loader={loaderFetchAPI} currentUserID={currentUserID} />
            }
          />
          <Route
            path="/category/:title"
            element={<Category loader={loaderFetchAPI} currentUserID={currentUserID} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                loader={loaderFetchAPI}
                currentUserID={currentUserID}
                loaderCart={loaderCart}
                openModal={openModal}
                cancelButtonRef={cancelButtonRef}
                handleModal={handleModal}
                setOpenModal={setOpenModal}
              />
            }
          />
          <Route
            path="/favourite"
            element={
              <Favourite
                loader={loaderFetchAPI}
                currentUserID={currentUserID}
                loaderfavourite={loaderfavourite}
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
