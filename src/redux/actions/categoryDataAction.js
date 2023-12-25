import { CATEGORYDATA } from "../types/categoryDataType";

const categoryDataAction = (data) => {
  return {
    type: CATEGORYDATA,
    data: data,
  };
};

export { categoryDataAction };
