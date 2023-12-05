import { ADDTOCART, CHECKOUT, DECREMENT, INCREMENT, REMOVEFROMCART } from "../types/cartType"

const incrementAction = (itemID) => {
    return {
        type: INCREMENT,
        currentID: itemID,
    }
}

const decrementAction = (itemID) => {
    return {
        type: DECREMENT,
        currentID: itemID,
    }
}

const addToCartAction = (data, currentSize,currentColor) => {
    return {
        type: ADDTOCART,
        data: {
            ...data,
            quantity: 1,
            currentSize: currentSize,
            currentColor: currentColor,
        }
    }
}

const removeFromCartAction = (dataID,currentSize,currentColor) => {
    return {
        type: REMOVEFROMCART,
        currentID: dataID,
        currentSize: currentSize,
        currentColor: currentColor,
    }
}


const checkoutAction = () => {
    return {
        type: CHECKOUT,
    }
}

export { incrementAction, decrementAction, addToCartAction, removeFromCartAction, checkoutAction }