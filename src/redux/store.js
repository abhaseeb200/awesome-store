import { combineReducers, createStore } from "redux";
import cartReducers from "./reducers/cartReducers";
import DataReducer from "./reducers/dataReducer";
import favouriteReducers from "./reducers/favouriteReducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const combinedReducer = combineReducers({
    data: DataReducer,
    addToCart: cartReducers,
    addToFavourite: favouriteReducers,
})

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, combinedReducer);
const store = createStore(persistedReducer)
const persistor = persistStore(store);
export { store, persistor }