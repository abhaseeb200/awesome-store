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

const Main = () => {
  const [loader, setLoader] = useState(true);

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
      setLoader(false)
    } catch (error) {
      console.log(error);
      setLoader(false)
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home loader={loader}/>} />
          <Route path="/product/:id" element={<ProductDetail loader={loader}/>} />
          <Route path="/category/:title" element={<Category loader={loader}/>} />
          <Route path="/cart" element={<Cart loader={loader}/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Main;
