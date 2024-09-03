import { combineReducers } from '@reduxjs/toolkit';
import { productSlice } from './slice/product';

export const rootReducer = combineReducers({
  [productSlice.name]: productSlice.reducer, 
})