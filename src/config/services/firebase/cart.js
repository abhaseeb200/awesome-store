import { db } from "../../firebaseConfig";

const setCart = (currentProductData, currentUserID) => {
    console.log(currentProductData, "++++++++++++]");
    return db.collection("carts").add({
        userId: currentUserID,
        timeStamp: Date.now(),
        currentProductData: currentProductData
    });
};

const getCart = (currentUserID) => {
    return db
        .collection("carts")
        .where("userId", "==", currentUserID)
        .orderBy("timeStamp", "desc")
        .get();
};

const deleteCart = (docId) => {
    return db.collection("carts")
        .doc(docId)
        .delete();
};

const orderProcess = (products, currentUserID) => {
    console.log([...products], currentUserID);
    return db.collection("orders").add({
        userId: currentUserID,
        timeStamp: Date.now(),
        products: [...products],
        status: "pending",
    })
}

export { setCart, getCart, deleteCart, orderProcess }