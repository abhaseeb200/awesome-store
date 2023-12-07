import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Home from "../../screens/home";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ProductDetail from "../../screens/productDetail";
import Category from "../../screens/category";
import { dataAction } from "../../redux/actions/dataAction";
import Cart from "../../screens/cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authState } from "../services/firebase/auth";
import {
  addToCartAction,
  emptyCarttAction,
} from "../../redux/actions/cartAction";
import { getCart } from "../services/firebase/cart";
import Favourite from "../../screens/favourite";

const Main = () => {
  const [loader, setLoader] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [loaderAuthIcon, setLoaderAuthIcon] = useState(true);
  const [loaderCart, setLoaderCart] = useState(true);
  const [loaderfavourite, setLoaderfavourite] = useState(false);
  const [currentUserID, setCurrentUserID] = useState("");

  const dispatch = useDispatch();

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
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const handleAuthState = async () => {
    try {
      authState((user) => {
        if (user) {
          setIsUser(true);
          setCurrentUserID(user.uid);
        } else {
          setIsUser(false);
          setCurrentUserID("");
          setLoaderCart(false);
        }
        setLoaderAuthIcon(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCart = async () => {
    dispatch(emptyCarttAction());
    if (currentUserID) {
      try {
        let response = await getCart(currentUserID);
        response.forEach((element) => {
          let product = element.data().currentProductData;
          dispatch(
            addToCartAction(
              product,
              product.currentSize,
              product.currentColor,
              product.currentPrice,
              product.quantity,
              element.id
            )
          );
        });
        setLoaderCart(false);
      } catch (error) {
        console.log(error);
        setLoaderCart(false);
      }
    }
  };

  useEffect(() => {
    handleFetch();
    handleAuthState();
  }, []);

  useEffect(() => {
    handleGetCart();
  }, [currentUserID]);

  return (
    <>
      <Router>
        <Navbar
          loaderAuthIcon={loaderAuthIcon}
          setIsUser={setIsUser}
          isUser={isUser}
          loaderCart={loaderCart}
          loaderfavourite={loaderfavourite}
        />
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={<Home loader={loader} currentUserID={currentUserID} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetail loader={loader} currentUserID={currentUserID} />
            }
          />
          <Route
            path="/category/:title"
            element={<Category loader={loader} currentUserID={currentUserID} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                loader={loader}
                currentUserID={currentUserID}
                loaderCart={loaderCart}
              />
            }
          />
          <Route
            path="/favourite"
            element={
              <Favourite
                loader={loader}
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
