import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : 'cart',
    initialState:{cart:[]},
    reducers:{
        addtocart:(state , action) => {
            state.cart.push(action.payload)}
        ,
        removefromcart: (state , action) => {
            state.cart = state.cart.filter(item => item.id != action.payload.id)
    }
}});

export const {addtocart , removefromcart} = cartSlice.actions;

const productSlice = createSlice({
    name : 'products',
    initialState : {products:[]},
    reducers:{
        createProduct : (state , action) => {state.products.push(action.payload)
    }}
});

export const {createProduct}=productSlice.actions;

const rootReducer={
    products:productSlice.reducer,
    cart:cartSlice.reducer,
}

export default rootReducer;