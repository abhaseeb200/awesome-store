import { combineReducers, createStore } from "redux";
import cartReducers from "./reducers/cartReducers";
import DataReducer from "./reducers/dataReducer";

const combinedReducer  = combineReducers({
    data: DataReducer,
    addToCart: cartReducers,
})

const store = createStore(combinedReducer)
export {store}