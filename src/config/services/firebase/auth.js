import { auth, googleProvider } from "../../firebaseConfig"


const authSignUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
}

console.log(googleProvider);
const authWithGoogle = () => {
    return auth.signInWithPopup(googleProvider)
}

const authSignIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
}

const authLogout = () => {
    return auth.signOut()
}

export { authSignIn, authSignUp, authLogout,authWithGoogle }