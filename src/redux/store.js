import { combineReducers, createStore } from "redux";
import cartReducers from "./reducers/cartReducers";
import dataReducer from "./reducers/dataReducer";
import favouriteReducers from "./reducers/favouriteReducers";
import searchReducers from "./reducers/searchReducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const combinedReducer = combineReducers({
    data: dataReducer,
    addToCart: cartReducers,
    addToFavourite: favouriteReducers,
    search: searchReducers,
})

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, combinedReducer);
const store = createStore(persistedReducer)
const persistor = persistStore(store);
export { store, persistor }