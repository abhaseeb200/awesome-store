import { ADDTOSEARCH } from "../types/searchType";

const addToSearchAction = (products, url) => {
    return {
        type: ADDTOSEARCH,
        products: products,
        currentURL: url
    };
};

export default addToSearchAction