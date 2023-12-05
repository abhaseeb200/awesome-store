import { ADDTOCART, CHECKOUT, DECREMENT, INCREMENT, REMOVEFROMCART } from "../types/cartType";

const initialState = {
    cart: [],
}

const cartReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADDTOCART:
            return { cart: [...state.cart, action.data] }
        case INCREMENT:
            let objIndexINC = state.cart.findIndex((obj => obj.id === action.currentID))
            state.cart[objIndexINC].quantity += 1
            return { cart: [...state.cart] }
        case DECREMENT:
            let objIndexDEC = state.cart.findIndex((obj => obj.id === action.currentID))
            state.cart[objIndexDEC].quantity > 1 ? state.cart[objIndexDEC].quantity -= 1 : 1
            return { cart: [...state.cart] }
        case REMOVEFROMCART:
            let tempRemove = state.cart.filter((i) => !(i.id === action.currentID && i.currentSize === action.currentSize && i.currentColor === action.currentColor))
            return { cart: [...tempRemove] }
        case CHECKOUT:
            return { cart: [] }
        default:
            return state
    }
}

export default cartReducers