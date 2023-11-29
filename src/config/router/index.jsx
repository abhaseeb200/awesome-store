import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../screens/home";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ProductDetail from "../../screens/productDetail";

const Main = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a" element={<ProductDetail />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
};

export default Main;
