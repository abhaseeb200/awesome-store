import { db } from "../../firebaseConfig";

const setUsers = (email,fullName,userID) => {
    return db.collection("users")
        .add({
            fullName: fullName,
            email: email,
            userID: userID,
        })
}

const getUser = (userID) => {
    return db.collection("users").where("userID","==",userID).get()
}

export { setUsers, getUser }