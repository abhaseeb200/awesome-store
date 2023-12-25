import { db } from "../../firebaseConfig";

const setFavourite = (currentProductData, currentUserID, prevFavourite) => {
  return db.collection("favourite").doc(currentUserID).set({
    productData: [...prevFavourite, currentProductData]
});
};

const getFavourite = (currentUserID) => {
  return db.collection("favourite").doc(currentUserID).get();
};

const deleteFavourite = (currentProductData, currentUserID, prevFavourite) => {
  let updateData = prevFavourite.filter((product) => product.id !== currentProductData.id)
  console.log(updateData);
  return db
    .collection("favourite")
    .doc(currentUserID)
    .set({
      productData: [...updateData],
    });
}

export { setFavourite, getFavourite, deleteFavourite };
