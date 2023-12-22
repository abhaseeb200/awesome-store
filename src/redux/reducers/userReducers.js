import { USER } from "../types/userType"

const initialState = {
    userID: "",
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case USER:
            return {
                userID: action.currentUser
            }
        default:
            return state
    }
}

export default userReducers