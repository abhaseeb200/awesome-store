import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CartProduct from "../../components/cardProduct";
import CartProductSkeleton from "../../components/cardProduct/skeleton";
import ProductDetailsModal from "../../components/modal/productDetailsModal";
import {
  addToFavouriteAction,
  emptyFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";

const Favourite = () => {
  const [open, setOpen] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);
  const [addToFavouriteLoader, setAddToFavouriteLoader] = useState(false);
  const [currentProductData, setCurrentProductData] = useState({});
  const [currentID, setCurrentID] = useState(null);

  const dispatch = useDispatch();

  const { userID } = useSelector((state) => state.user);
  const { favourite } = useSelector((stata) => stata.addToFavourite);

  const handleRemoveFavourite = async (currentProductData) => {
    setCurrentID(currentProductData.id);
    setAddToFavouriteLoader(true);
    if (userID) {
      //user is login
      try {
        // await deleteFavourite(currentProductData, userID, favourite);
        dispatch(removeFromFavouriteAction(currentProductData.id));
        setAddToFavouriteLoader(false);
        toast.success("Remove favourite!", {
          autoClose: 1500,
        });
      } catch (error) {
        console.log(error);
        setAddToFavouriteLoader(false);
      }
    } else {
      //user is logout
      dispatch(removeFromFavouriteAction(currentProductData.id));
      setAddToFavouriteLoader(false);
      toast.success("Remove favourite!", {
        autoClose: 1500,
      });
    }
  };

  const handleModal = (productData) => {
    setCurrentProductData(productData);
    setOpen(true);
  };

  const handleGetFavourite = async () => {
    setMainLoader(true);
    try {
      // let result = await getFavourite(userID);
      // If the document exists, extract the data
      if (result.exists) {
        dispatch(emptyFavouriteAction());
        let productData = result.data().productData;
        console.log(productData);
        productData.forEach((item) => {
          dispatch(addToFavouriteAction(item));
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMainLoader(false);
    }
  };

  useEffect(() => {
    if (userID) {
      handleGetFavourite();
    } else {
      setMainLoader(false);
    }
  }, [userID]);

  return (
    <div className="myPadding flex-1 min-h-[700px]">
      <h2 className="font-medium text-3xl sm:py-10 pt-5 ">Favourite</h2>
      <div className="flex flex-wrap -mx-4">
        {mainLoader ? (
          <>
            <CartProductSkeleton />
            <CartProductSkeleton />
            <CartProductSkeleton />
            <CartProductSkeleton />
          </>
        ) : favourite.length > 0 ? (
          favourite.map((product, index) => {
            return (
              <div className="w-full sm:w-1/2 md:w-1/4 px-4" key={index}>
                <CartProduct
                  productData={product}
                  favourite={favourite}
                  addToFavouriteLoader={addToFavouriteLoader}
                  currentID={currentID}
                  handleModal={handleModal}
                  handleRemoveFavourite={handleRemoveFavourite}
                />
              </div>
            );
          })
        ) : (
          <p className="mx-4">No items added to favourite</p>
        )}
      </div>

      <ProductDetailsModal
        open={open}
        setOpen={setOpen}
        currentProductData={currentProductData}
      />
    </div>
  );
};

export default Favourite;
