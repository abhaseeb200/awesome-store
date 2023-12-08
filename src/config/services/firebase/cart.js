import { db } from "../../firebaseConfig";

const setCart = (currentProductData, currentUserID, prevProductData) => {
    console.log(prevProductData, "PREVV", currentProductData);
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
    currentCartData[currentIndex].quantity = currentQuantity
    // console.log(currentCartData);
    return db
        .collection("carts")
        .doc(currentUserID)
        .set({
            productData: [...currentCartData]
        })
};

const deleteCart = (currentUserID, currentID, currentSize, currentColor, currentCartData) => {
    let updateCart = currentCartData.filter((i) => !(i.id === currentID && i.currentSize === currentSize && i.currentColor === currentColor))
    return db.collection("carts").doc(currentUserID).set({
        productData: [...updateCart]
    })
};

const orderProcess = (products, currentUserID) => {
    console.log(products, currentUserID);
    return db.collection("orders").add({
        userId: currentUserID,
        timeStamp: Date.now(),
        products: [...products],
        status: "pending",
    })
}

const emptryCart = (currentUserID) => {
    console.log(currentUserID);
    return db.collection("carts").doc(currentUserID).delete()
}
export { setCart, getCart, deleteCart, updateCart, orderProcess, emptryCart }