import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProducts } from "../type/product";
import { AxiosInstance } from "axios";
import { ApiRoute } from "../const";

export const fetchGetProducts = createAsyncThunk<TProducts[], undefined, { extra: AxiosInstance}>(
  'data/fetchGetProducts',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TProducts[]>(ApiRoute.PRODUCTS)
    
    return data;
  }
)