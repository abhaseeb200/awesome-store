import { ADDTOCART, DECREMENT, EMPTYCART, INCREMENT, REMOVEFROMCART } from "../types/cartType"

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

const addToCartAction = (data, currentSize, currentColor,currentPrice,docID) => {
    console.log(docID,"_____________");
    return {
        type: ADDTOCART,
        data: {
            ...data,
            quantity: 1,
            currentSize: currentSize,
            currentColor: currentColor,
            currentPrice: currentPrice,
            docID : docID,
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