import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../../components/cardProduct";
import { removeFromFavouriteAction } from "../../redux/actions/favouriteAction";
import { toast } from "react-toastify";

const Favourite = () => {
  const { favourite } = useSelector((stata) => stata.addToFavourite);
  const dispatch = useDispatch()

  const handleRemoveFavourite = (currentProductData) => {
    dispatch(removeFromFavouriteAction(currentProductData.id));
    toast.success("Remove favourite!", {
      autoClose: 1500,
    });
  };

  return (
    <div className="myPadding flex-1 min-h-[700px]">
      <h2 className="font-medium text-3xl py-10">Favourite</h2>
      <div className="flex">
        {favourite.map((product, index) => {
          return (
            <div className="w-full sm:w-1/2 md:w-1/4 px-4" key={index}>
              <CartProduct
                productData={product}
                handleRemoveFavourite={handleRemoveFavourite}
                favourite = {favourite}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favourite;
