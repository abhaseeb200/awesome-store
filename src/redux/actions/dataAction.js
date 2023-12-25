import { DATA } from "../types/dataType";

const dataAction = (data,skip,total) => {
  return {
    type: DATA,
    data: data,
    skip: skip,
    total: total
  };
};

export { dataAction };
