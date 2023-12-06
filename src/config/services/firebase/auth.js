import { auth, googleProvider } from "../../firebaseConfig"


const authSignUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
}

const authWithGoogle = () => {
    return auth.signInWithPopup(googleProvider)
}

const authSignIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
}

const authLogout = () => {
    return auth.signOut()
}

const authState = (user) => {
    return auth.onAuthStateChanged(user)
}
export { authSignIn, authSignUp, authLogout, authWithGoogle,authState }