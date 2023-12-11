import { ADDTOCART, DECREMENT, EMPTYCART, INCREMENT, REMOVEFROMCART } from "../types/cartType"

const incrementAction = (currentProductData) => {
    return {
        type: INCREMENT,
        currentProductData: currentProductData
    }
}

const decrementAction = (currentProductData) => {
    return {
        type: DECREMENT,
        currentProductData: currentProductData
    }
}

const addToCartAction = (data) => {
    return {
        type: ADDTOCART,
        data: data
    }
}

const removeFromCartAction = (currentProductData) => {
    return {
        type: REMOVEFROMCART,
        currentProductData: currentProductData,
    }
}

const emptyCarttAction = () => {
    return {
        type: EMPTYCART,
    }
}

export { incrementAction, decrementAction, addToCartAction, removeFromCartAction, emptyCarttAction }