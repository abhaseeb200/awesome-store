import ProductCard from "@/components/productCard";
import ProductsGridSkeleton from "./skeleton";

const ProductsGrid = ({ products, loading }) => {
  if (loading) {
    return <ProductsGridSkeleton />;
  }

  return (
    <div className="px-4 md:p-8 lg:p-10 pt-5">
      <h2 className="font-bold md:text-3xl text-lg text-center capitalize pb-8">
        Most Popular Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
