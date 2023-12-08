import { db } from "../../firebaseConfig";

const setFavourite = (currentProductData, currentUserID,currentFavouriteData) => {
  // let updateData = [currentProductData.id]
  console.log(currentFavouriteData,"______________");
  return db
    .collection("favourite")
    .doc(currentUserID)
    .set({
      // userId: [currentUserID],
      // timeStamp: Date.now(),
      currentProductData: [currentProductData.id],
    });
};

const getFavourite = (currentUserID) => {
    console.log(currentUserID,"------------");
  return db.collection("favourite").doc(currentUserID).get();
};

export { setFavourite, getFavourite };
