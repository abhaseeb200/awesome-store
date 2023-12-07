import { db } from "../../firebaseConfig";

const setFavourite = (currentProductData, currentUserID) => {
    return db.collection("favourite").add({
        userId: [currentUserID],
        timeStamp: Date.now(),
        currentProductData: currentProductData
    });
};

const getFavourite = (currentUserID) => {
    return db
        .collection("carts")
        .where("userId", "==", currentUserID)
        .orderBy("timeStamp", "desc")
        .get();
};

export {setFavourite}