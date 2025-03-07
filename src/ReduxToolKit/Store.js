import {configureStore} from "@reduxjs/toolkit"
import productsreducer from "./Slices/Fetchproducts"

export const store = configureStore({
    reducer : {
        items : productsreducer
    }
})