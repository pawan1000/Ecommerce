import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import cartReducer from "./reducers/cartReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'] // only user will be stored

}
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store);