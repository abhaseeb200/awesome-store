import { db } from "../../firebaseConfig";

const setCart = (currentProductData, currentUserID) => {
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

const updateCart = (currentQuantity, currentProductData) => {
    return db
        .collection("carts")
        .doc(currentProductData?.docID)
        .update({
            currentProductData: {
                ...currentProductData, 
                quantity: currentQuantity
            }
        });
};

const deleteCart = (docId) => {
    return db.collection("carts")
        .doc(docId)
        .delete();
};

const orderProcess = (products, currentUserID) => {
    return db.collection("orders").add({
        userId: currentUserID,
        timeStamp: Date.now(),
        products: [...products],
        status: "pending",
    })
}

export { setCart, getCart, deleteCart, updateCart, orderProcess }