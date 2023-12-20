import { ADDTOSEARCH, REMOVETOSEARCH } from "../types/searchType";

const initialState = {
    searchProducts: {
        products: [],
        url: null,
        recentSearched: [],
    },
};

const searchReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADDTOSEARCH:
            //check if find same currentSearch add on the top. and remove previously
            let upadateRecenetSearch = []
            let isAlready = state.searchProducts.recentSearched.includes(action.currentSearch)
            if (isAlready) {
                upadateRecenetSearch = state.searchProducts.recentSearched.filter((item) => item !== action.currentSearch)
                upadateRecenetSearch = [action.currentSearch, ...upadateRecenetSearch]
            } else {
                upadateRecenetSearch = [action.currentSearch, ...state.searchProducts.recentSearched]
            }
            return {
                searchProducts: {
                    products: action.products,
                    url: action.currentURL,
                    recentSearched: upadateRecenetSearch,
                },
            };
        case REMOVETOSEARCH:
            let removeRecentSearch = state.searchProducts.recentSearched.filter((item) => item !== action.currentSearch)
            return {
                searchProducts: {
                    products: [...state.searchProducts.products],
                    url: state.searchProducts.url,
                    recentSearched: removeRecentSearch,
                },
            }
        default:
            return state;
    }
};

export default searchReducers;