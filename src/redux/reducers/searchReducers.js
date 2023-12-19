import { ADDTOSEARCH } from "../types/searchType"

const initialState = {
    searchProducts: {},
}

const searchReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADDTOSEARCH:
            return { searchProducts: { products: action.products, url: action.currentURL, currentSearche: [action.currentSearch, ...state.searchProducts.currentSearch ] } }
        default:
            return state
    }
}

export default searchReducers