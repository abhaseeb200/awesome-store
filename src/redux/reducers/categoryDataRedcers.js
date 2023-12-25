import { CATEGORYDATA } from "../types/categoryDataType";

const initialState = {
  productData: {},
};

const categoryDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORYDATA:
        return {
          productData: action.data,
        }
    default:
      return state;
  }
};

export default categoryDataReducer;
