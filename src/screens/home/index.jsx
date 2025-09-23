import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import HeroSection from "../../components/heroSection";
import HeroSectionSkeleton from "../../components/heroSection/skeleton";
import ProductDetailsModal from "../../components/modal/productDetailsModal";
// import PopularProducts from "../../components/popularProducts";
import {
  addToFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";
import { dataAction } from "../../redux/actions/dataAction";
import axios from "axios";
import api from "@/config/axios/api";
import useCategory from "@/hooks/useCategory";
import CategoriesSkeleton from "./component/categories/skeleton";
import TopCategories from "./component/categories";
import ProductsGrid from "./component/products";
import usePopularProducts from "@/hooks/useProducts";
import homeBanner from "@/assets/home-banner.jpg";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [currentProductData, setCurrentProductData] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    getAllCategories,
    categories,
    loading: categoriesLoading,
  } = useCategory();

  const { products, loading: productsGridLoading } = usePopularProducts();

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <HeroSection
        title="We have 50% discounts"
        backgroundImage={homeBanner}
        loading={loading}
      />

      {/* SECTION: Top Categories */}
      <div className="px-4 md:p-8 lg:p-10 pt-5">
        <h2 className="font-bold md:text-3xl text-lg text-center capitalize pb-8">
          Top Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categoriesLoading
            ? [...Array(6)].map((_, index) => (
                <CategoriesSkeleton key={index} />
              ))
            : categories?.map((category) => (
                <TopCategories key={category?._id} category={category} />
              ))}
        </div>
      </div>

      {/* SECTION: Popular Products */}
      <ProductsGrid loading={productsGridLoading} products={products} />

      {/* SECTION: Categories Products */}

      <ProductDetailsModal
        open={open}
        setOpen={setOpen}
        currentProductData={currentProductData}
      />
    </>
  );
};

export default Home;
