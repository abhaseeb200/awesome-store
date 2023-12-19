import { ADDTOSEARCH } from "../types/searchType";

const addToSearchAction = (products, url, currentSearch) => {
    return {
        type: ADDTOSEARCH,
        products: products,
        currentURL: url,
        currentSearch: currentSearch,
    };
};

export default addToSearchAction