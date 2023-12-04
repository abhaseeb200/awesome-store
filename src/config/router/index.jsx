import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Home from "../../screens/home";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ProductDetail from "../../screens/productDetail";
import Category from "../../screens/category";
import { dataAction } from "../../redux/actions/dataAction";

const Main = () => {
  const dispatch = useDispatch();
  const handleFetch = async () => {
    // console.log("FETCHING DATA..............");
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
    } catch (error) {
      console.log(error);
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
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:title" element={<Category />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Main;
