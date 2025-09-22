import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CartProductOrder from "./components";
import CartProductSkeleton from "../../components/cardProduct/skeleton";

const OrderProducts = () => {
  const [currentProducts, setCurrentProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  const { orderID } = useParams();

  const { userID } = useSelector((state) => state.user);

  const handleGetOrderProductsDetails = async () => {
    try {
      // let response = await getOrderProductDoc(orderID);
      console.log(response.data().products, "RESPON");
      setCurrentProducts(response.data().products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (userID) {
      handleGetOrderProductsDetails();
    } else {
      // console.log("User is logout...");
      setLoader(false);
    }
  }, [userID]);

  return (
    <div className="myPadding flex-1 min-h-[700px]">
      <h2 className="font-medium text-3xl sm:py-10 pt-5">Order Details</h2>
      <div className="flex flex-wrap -mx-4">
        {loader ? (
          <>
            <CartProductSkeleton />
            <CartProductSkeleton />
            <CartProductSkeleton />
            <CartProductSkeleton />
          </>
        ) : currentProducts?.length > 0 ? (
          currentProducts?.map((product, index) => {
            return (
              <div className="w-full sm:w-1/2 md:w-1/4 px-4" key={index}>
                <CartProductOrder productData={product} />
              </div>
            );
          })
        ) : (
          <p className="mx-4">No Order is found</p>
        )}
      </div>
    </div>
  );
};

export default OrderProducts;
