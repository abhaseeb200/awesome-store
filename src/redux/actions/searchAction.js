import { ADDTOSEARCH, REMOVETOSEARCH } from "../types/searchType";

const addToSearchAction = (products, url, currentSearch) => {
    return {
        type: ADDTOSEARCH,
        products: products,
        currentURL: url,
        currentSearch: currentSearch,
    };
};

const removeToSearchAction = (currentSearch) => {
    return {
        type: REMOVETOSEARCH,
        currentSearch: currentSearch
    };
};

export { addToSearchAction, removeToSearchAction }