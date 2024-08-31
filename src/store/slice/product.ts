import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGetProducts } from "../api-store";
import { KeyLocalStorage, RequestStatus } from "../../const";
import { TProducts } from "../../type/product";
import { getDataLocalStorage } from "../../utils";

type TInitialState = {
  statusProduct: string;
  products: TProducts[];
  productsFilter: TProducts[];
  filterSetting: {like: boolean}
}

const initialState: TInitialState = {
  statusProduct: RequestStatus.NONE,
  products: [],
  productsFilter: [],
  filterSetting: {
    like: true
  }
}

const productSlice = createSlice({
  extraReducers(builder) {
      builder
      .addCase(fetchGetProducts.pending, (state) => {
        state.statusProduct = RequestStatus.LOADING;
      })
      .addCase(fetchGetProducts.fulfilled, (state, action) => {
        state.statusProduct = RequestStatus.SUCCESS;
        state.products = action.payload;
        state.productsFilter = action.payload;
      })
      .addCase(fetchGetProducts.rejected, (state) => {
        state.statusProduct = RequestStatus.FAILED;
      })
  },
  initialState,
  name: 'productSlice',
  reducers: {
    deleteProduct: (state, action: PayloadAction<{id: string}>) => {
      state.products = state.products.filter((element) => element.gameID !== action.payload.id)
    },
    filterProduct: (state, action: PayloadAction<{like: boolean}>) => {
      const idProduct = getDataLocalStorage(KeyLocalStorage.LIKE);
      let idProductNumber: number [] = [];
      if (idProduct) {
        idProductNumber = JSON.parse(idProduct);
      }

      state.filterSetting = {
        like: action.payload.like,
      }

      if (state.filterSetting.like) {
        state.productsFilter = state.products.filter((e) => idProductNumber.includes(+e.gameID));
        return;
      }

      state.productsFilter = state.products;
    }
  },
  selectors: {
    products: (state) => state.products,
    statusProduct: (state) => state.statusProduct,
    productsFilter: (state) => state.productsFilter,
  }
})

const actionsProduct = productSlice.actions;
const selectorsProduct = productSlice.selectors;

export { productSlice, actionsProduct, selectorsProduct }