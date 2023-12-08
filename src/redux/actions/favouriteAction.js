import {
  ADDTOFAVOURITE,
  EMPTRYFAVOURITE,
  REMOVEFROMFAVOURITE,
} from "../types/favouriteType";

const addToFavouriteAction = (data) => {
  return {
    type: ADDTOFAVOURITE,
    data: data,
  };
};

const removeFromFavouriteAction = (dataID) => {
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
