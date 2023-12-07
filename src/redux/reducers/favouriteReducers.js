import { ADDTOFAVOURITE, EMPTRYFAVOURITE, REMOVEFROMFAVOURITE } from "../types/favouriteType";

const initialState = {
    favourite: [],
}

const FavouriteReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADDTOFAVOURITE:
            return { favourite: [...state.favourite,action.data] }
        case REMOVEFROMFAVOURITE:
            let tempRemove = state.favourite.filter((i)=> i.id !== action.currentID)
            return { favourite: [...tempRemove] }
        case EMPTRYFAVOURITE:
            return { favourite: [] }
        default:
            return state
    }
}

export default FavouriteReducers