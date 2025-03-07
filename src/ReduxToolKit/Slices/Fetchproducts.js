import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchproducts = createAsyncThunk("fetchproducts", async () => {
    const response = await fetch("https://car-trade-api-3.onrender.com/data");
    const data = await response.json();
    return data;
});

const productsSlice = createSlice({
    name: "jkl",
    initialState: {
        products: [],
        status: "idle",
        error: null,
      
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchproducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchproducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
                
            })
            .addCase(fetchproducts.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            });
    },
});


export default productsSlice.reducer;
