import {
    configureStore
} from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store