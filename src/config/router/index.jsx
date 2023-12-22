import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
import { authState } from "../services/firebase/auth";

const Main = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [loaderCart, setLoaderCart] = useState(true);
  const [loaderfavourite, setLoaderfavourite] = useState(true);
  const [currentUserID, setCurrentUserID] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsWithoutStore, setProductsWithoutStore] = useState({});

  const cancelButtonRef = useRef(null);

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
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    handleAuthState();
  }, []);

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/product/:id"
            element={
              <ProductDetail
                productsWithoutStore={productsWithoutStore}
                setProductsWithoutStore={setProductsWithoutStore}
              />
            }
          />
          <Route
            path="/category/:title"
            element={
              <Category
                productsWithoutStore={productsWithoutStore}
                setProductsWithoutStore={setProductsWithoutStore}
              />
            }
          />
          <Route path="/cart" element={<Cart setOpenModal={setOpenModal} />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/search" element={<Search />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderID" element={<OrderProducts />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Main;
