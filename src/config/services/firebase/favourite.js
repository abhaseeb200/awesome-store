import { db } from "../../firebaseConfig";

const setFavourite = (currentProductData, currentUserID, prevFavourite) => {
  let allPrevFavouriteID = prevFavourite.map((product) => product.id)
  return db
    .collection("favourite")
    .doc(currentUserID)
    .set({
      productsID: [...allPrevFavouriteID, currentProductData.id],
    });
};

const deleteFavourite = (currentProductData, currentUserID, prevFavourite) => {
  let allPrevFavouriteID = prevFavourite.map((product) => product.id)
  let updateData = allPrevFavouriteID.filter((id) => id !== currentProductData.id)
  // console.log(allPrevFavouriteID,"RMOVE PRODUCTS IDS",updateData);
  return db
    .collection("favourite")
    .doc(currentUserID)
    .set({
      productsID: [...updateData],
    });
}

const getFavourite = (currentUserID) => {
  return db.collection("favourite").doc(currentUserID).get();
};

export { setFavourite, getFavourite, deleteFavourite };
