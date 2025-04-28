import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import productSlice from "./slices/productSlice.js";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
    }
})