import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardProductDetails from "../../components/cardProductDetails";
import CartProduct from "../../components/cardProduct";
import Modal from "../../components/modal";
import { addToCartAction } from "../../redux/actions/cartAction";

const ProductDetail = () => {
  const [open, setOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [currentSize, setCurrentSize] = useState("");
  const [currentProductData, setCurrentProductData] = useState({});
  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch()
  const { productData } = useSelector((stata) => stata.data);
  const { cart } = useSelector((stata) => stata.addToCart);
  const { id } = useParams();

  let currentProduct = {};
  let currentCategory = "";
  let relatedProducts = [];

  Object.keys(productData).forEach((category) => {
    const foundProduct = productData[category].find(
      (product) => product.id == id
    );
    if (foundProduct) {
      currentProduct = foundProduct;
      currentCategory = category;
      return;
    }
  });

  if (currentCategory) {
    // console.log(currentCategory, "----", productData[currentCategory]);
    relatedProducts = productData[currentCategory].filter((product) => {
      return product.id !== +id;
    });
  }

  console.log(currentPrice,"++++++++++++++++++=",cart);
  const handleCurrentSizes = (price,size) => {
    // console.log(size,"//////////////////////", price);
    setCurrentPrice(price);
    setCurrentSize(size)
  };

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  const handleAddToCart = (currentProductData) => {
    //check kern -> agir same id ka wala product gir raha hai
    //To(if) ussi id wala product ka data addToCartAction() mei jaiye ga ===> check kerun agir same size wala product hai to manna kern other wise add kern
    //Else original data mei se addToCartAction() mei jaiye ga

    let isProductInCart = cart.filter((product) => product.id === currentProductData.id)
    console.log(isProductInCart,"=========");
    if (isProductInCart) {
      //same id wala product hai
      //agir same size wala product hai to error show kerun.
      // if (isProductInCart?.sizes[currentSize]?.quantity > 0) {
      //   console.log("ALREADY IN CARTTTTTT");
      // } else {
      //   dispatch(addToCartAction(isProductInCart,currentSize))
      // }
    } else {
      //dosri id wala product hai
      dispatch(addToCartAction(currentProductData,currentSize))
    }


    // console.log(currentProductData," ------------ ADD TO CART ----------",currentSize);
    // let isHasSize = Object.keys(isInCart.sizes).find((size)=> size === currentSize)
    // let isSameSize = isInCart.find((product)=> console.log(product.sizes,"-------------------------"))
    // console.log(isInCart,"IIIIIIIIIIIIIIIIIIIIIII   IS IN CARTTTTT",isInCart?.sizes[currentSize]?.quantity,currentSize);
    // if (isInCart?.sizes[currentSize]?.quantity > 0) {
    //   console.log("ALREADY IN CART");
    // } else {
    //   dispatch(addToCartAction(currentProductData,currentSize))
    // }
  }

  useEffect(()=> {
    console.log(currentProduct?.sizes?.small,"---------------");
    setCurrentPrice(currentProduct?.sizes?.small)
  },[id])

  return (
    <>
      <CardProductDetails
        currentProductData={currentProduct}
        currentPrice={currentPrice}
        setCurrentPrice={setCurrentPrice}
        handleCurrentSizes={handleCurrentSizes}
        handleAddToCart={handleAddToCart}
      />
      <hr className="my-8 border-t  " />
      <div className="overflow-x-hidden myPadding pb-8">
        <h2 className="font-bold text-3xl">Related products</h2>
        <div className=" flex items-center gap-x-3 w-full overflow-x-auto pb-6">
          {relatedProducts.map((product, index) => {
            return (
              <CartProduct
                key={index}
                productData={product}
                handleModal={handleModal}
              />
            );
          })}
        </div>
      </div>

      <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
        <CardProductDetails currentProductData={currentProductData} />
      </Modal>
    </>
  );
};

export default ProductDetail;
