import { db } from "../../firebaseConfig";

const setUsers = (fullName,email,userID) => {
    return db.collection("users")
        .add({
            fullName: fullName,
            email: email,
            userID: userID,
        })
}


export { setUsers }