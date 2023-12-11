import { db } from "../../firebaseConfig";

const setFavourite = (currentProductData, currentUserID, prevFavourite) => {
  //only set ID products in array form
  let allPrevFavouriteID = prevFavourite.map((product) => product.id)
  return db
    .collection("favourite")
    .doc(currentUserID)
    .set({
      productsID: [...allPrevFavouriteID, currentProductData.id],
    });
};

const getFavourite = (currentUserID) => {
  return db.collection("favourite").doc(currentUserID).get();
};

const deleteFavourite = (currentProductData, currentUserID, prevFavourite) => {
  let allPrevFavouriteID = prevFavourite.map((product) => product.id)
  let updateData = allPrevFavouriteID.filter((id) => id !== currentProductData.id)
  return db
    .collection("favourite")
    .doc(currentUserID)
    .set({
      productsID: [...updateData],
    });
}

export { setFavourite, getFavourite, deleteFavourite };
