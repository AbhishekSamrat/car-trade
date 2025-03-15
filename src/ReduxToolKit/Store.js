import {configureStore} from "@reduxjs/toolkit"
import productsreducer from "./Slices/Fetchproducts"
import cartReducer from "./Slices/cartSlice"

export const store = configureStore({
    reducer : {
        items : productsreducer,
        cart: cartReducer,
    }
})