import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getFavourite } from "../services/firebase/favourite";
import {
  addToFavouriteAction,
  emptyFavouriteAction,
} from "../../redux/actions/favouriteAction";

const Main = () => {
  const [loader, setLoader] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [loaderAuthIcon, setLoaderAuthIcon] = useState(true);
  const [loaderCart, setLoaderCart] = useState(true);
  const [loaderfavourite, setLoaderfavourite] = useState(true);
  const [currentUserID, setCurrentUserID] = useState("");
  const [currentFavourites, setCurrentFavourites] = useState([]);

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
          setLoaderfavourite(false);
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
        let result = await getCart(currentUserID);
        if (result.exists) {
          console.log(result.data().productData);
          let dbProductData = result.data().productData;
          for (let i = 0; i < dbProductData?.length; i++) {
            dispatch(addToCartAction(dbProductData[i]));
          }
        }
        // response.forEach((element) => {
        //   let product = element.data().currentProductData;
        //   dispatch(
        //     addToCartAction(
        //       product,
        //       product.currentSize,
        //       product.currentColor,
        //       product.currentPrice,
        //       product.quantity,
        //       element.id
        //     )
        //   );
        // });
        setLoaderCart(false);
      } catch (error) {
        console.log(error);
        setLoaderCart(false);
      }
    }
  };

  const handleGetFavourite = async () => {
    dispatch(emptyFavouriteAction());
    if (currentUserID) {
      try {
        let result = await getFavourite(currentUserID);
        if (result.exists) {
          // If the document exists, extract the data
          let filterFavouriteProducts = [];
          let productsID = result.data().productsID;
          Object.keys(productData).forEach((category) => {
            for (let i = 0; i < productsID?.length; i++) {
              let obj = productData[category]?.find(
                (product) => product.id === productsID[i]
              );
              if (obj) {
                dispatch(addToFavouriteAction(obj));
                filterFavouriteProducts.push(obj);
              }
            }
          });
          console.log(filterFavouriteProducts);
          setCurrentFavourites(result.data().productsID);
          setLoaderfavourite(false);
        }
      } catch (error) {
        console.log(error);
        setLoaderfavourite(false);
      }
    }
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
        />
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loader={loader}
                currentUserID={currentUserID}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetail
                loader={loader}
                currentUserID={currentUserID}
                loaderfavourite={loaderfavourite}
              />
            }
          />
          <Route
            path="/category/:title"
            element={
              <Category
                loader={loader}
                currentUserID={currentUserID}
                loaderfavourite={loaderfavourite}
              />
            }
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
