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
        currentProductData
    }
}

const addToCartAction = (data, currentSize, currentColor, currentPrice, quantity = 1, docID) => {
    return {
        type: ADDTOCART,
        data: {
            ...data,
            quantity: quantity,
            currentSize: currentSize,
            currentColor: currentColor,
            currentPrice: currentPrice,
            docID: docID,
        }
    }
}

const removeFromCartAction = (dataID, currentSize, currentColor) => {
    return {
        type: REMOVEFROMCART,
        currentID: dataID,
        currentSize: currentSize,
        currentColor: currentColor,
    }
}


const emptyCarttAction = () => {
    return {
        type: EMPTYCART,
    }
}

export { incrementAction, decrementAction, addToCartAction, removeFromCartAction, emptyCarttAction }