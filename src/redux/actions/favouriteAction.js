import { ADDTOFAVOURITE, EMPTRYFAVOURITE, REMOVEFROMFAVOURITE } from "../types/favouriteType"

const addToFavouriteAction = (data, docID) => {
    console.log(data, docID, "---------------------------------_______-");
    return {
        type: ADDTOFAVOURITE,
        data: { ...data, docID: docID }
    }
}

const removeFromFavouriteAction = (dataID) => {
    console.log(data, docID);
    return {
        type: REMOVEFROMFAVOURITE,
        currentID: dataID,
    }
}

const emptyFavouriteAction = () => {
    return {
        type: EMPTRYFAVOURITE,
    }
}


export { addToFavouriteAction, removeFromFavouriteAction, emptyFavouriteAction }