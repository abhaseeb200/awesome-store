import Slider from "react-slick";
import CartProduct from "../../cardProduct";

const ProductSlider = ({ productsByCategory }) => {
  console.log(productsByCategory, "CURRENT PRODUCT DATA");
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className="products-slider">
      <Slider {...settings}>
        {productsByCategory.map((product, productIND) => {
          return (
            <div key={productIND}>
              <CartProduct productData={product} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductSlider;
