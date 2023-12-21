import { db } from "../../firebaseConfig"

const orderProcess = (products, currentUserID) => {
    return db.collection("orders").add({
        userId: currentUserID,
        timeStamp: Date.now(),
        products: [...products],
        status: "pending",
    })
}

const getOrder = (currentUserID) => {
    return db.collection("orders")
        .where("userId", "==", currentUserID)
        .orderBy("timeStamp", "desc")
        .get();
}

export { orderProcess, getOrder }