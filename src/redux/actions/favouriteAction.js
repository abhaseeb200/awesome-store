import {
  ADDTOFAVOURITE,
  EMPTRYFAVOURITE,
  REMOVEFROMFAVOURITE,
} from "../types/favouriteType";

const addToFavouriteAction = (data) => {
  console.log(data);
  return {
    type: ADDTOFAVOURITE,
    data: data,
  };
};

const removeFromFavouriteAction = (dataID) => {
  console.log(data, docID);
  return {
    type: REMOVEFROMFAVOURITE,
    currentID: dataID,
  };
};

const emptyFavouriteAction = () => {
  return {
    type: EMPTRYFAVOURITE,
  };
};

export {
  addToFavouriteAction,
  removeFromFavouriteAction,
  emptyFavouriteAction,
};
