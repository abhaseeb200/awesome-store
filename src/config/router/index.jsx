import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const Main = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:title" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
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
