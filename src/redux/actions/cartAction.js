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

const addToCartAction = (data, currentSize) => {
    return {
        type: ADDTOCART,
        data: {
            ...data,
            sizes: {
                ...data.sizes,
                [currentSize]: {
                    ...data.sizes[currentSize],
                    quantity: 1
                }
            }
        }
    }
}

const removeFromCartAction = (dataID) => {
    return {
        type: REMOVEFROMCART,
        currentID: dataID
    }
}


const checkoutAction = () => {
    return {
        type: CHECKOUT,
    }
}

export { incrementAction, decrementAction, addToCartAction, removeFromCartAction, checkoutAction }