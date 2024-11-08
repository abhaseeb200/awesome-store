import { db } from "../../firebaseConfig"

const orderProcess = (products, fullName ,currentUserID) => {
    return db.collection("orders").add({
        userId: currentUserID,
        fullName: fullName,
        timeStamp: Date.now(),
        products: [...products],
        dateAndTime: new Date().toString(),
        status: "pending",
    })
}

const getOrder = (currentUserID) => {
    return db.collection("orders")
        .where("userId", "==", currentUserID)
        .orderBy("timeStamp", "desc")
        .get();
}

const getOrderProductDoc = (docID) => {
    return db.collection("orders").doc(docID).get()
}

export { orderProcess, getOrder, getOrderProductDoc }