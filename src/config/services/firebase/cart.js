import { db } from "../../firebaseConfig";

const setCart = (currentProductData, currentUserID, prevProductData) => {
    return db.collection("carts").doc(currentUserID).set({
        productData: [...prevProductData, currentProductData]
    });
};

const getCart = (currentUserID) => {
    return db.collection("carts").doc(currentUserID).get();
};

const updateCart = (currentQuantity, currentProductData, currentUserID, currentCartData) => {
    const { currentColor, currentSize, id } = currentProductData
    let currentIndex = currentCartData.findIndex((i) => i.id === id && i.currentSize === currentSize && i.currentColor === currentColor)
    currentCartData[currentIndex].quantity = currentQuantity //update the array with get index number
    return db
        .collection("carts")
        .doc(currentUserID)
        .set({
            productData: [...currentCartData]
        })
};

const deleteCart = (currentUserID, currentProductData, currentCartData) => {
    const { currentColor, currentSize, id } = currentProductData
    let updateCart = currentCartData.filter((i) => !(i.id === id && i.currentSize === currentSize && i.currentColor === currentColor))
    return db.collection("carts").doc(currentUserID).set({
        productData: [...updateCart]
    })
};

const orderProcess = (products, currentUserID) => {
    return db.collection("orders").add({
        userId: currentUserID,
        timeStamp: Date.now(),
        products: [...products],
        status: "pending",
    })
}

const emptryCart = (currentUserID) => {
    return db.collection("carts").doc(currentUserID).delete()
}

export { setCart, getCart, deleteCart, updateCart, orderProcess, emptryCart }