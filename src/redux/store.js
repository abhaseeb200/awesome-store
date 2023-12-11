import { combineReducers, createStore } from "redux";
import cartReducers from "./reducers/cartReducers";
import DataReducer from "./reducers/dataReducer";
import favouriteReducers from "./reducers/favouriteReducers";

const combinedReducer  = combineReducers({
    data: DataReducer,
    addToCart: cartReducers,
    addToFavourite: favouriteReducers,
})

const store = createStore(combinedReducer)
export {store}