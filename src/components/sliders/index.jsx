import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "./slick.css";
import "./slick-theme.css";
import "./style.css";

const ThumbnailSlider = ({ currentProductData }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <div>
          <img src={currentProductData.images[i]} />
        </div>
      );
    },
  };

  return (
    <div className="thumbnail-slider">
      <Slider {...settings}>
        {currentProductData.images?.map((url, ind) => {
          return (
            <div key={ind}>
              <img src={url} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ThumbnailSlider;
