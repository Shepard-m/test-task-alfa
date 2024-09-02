import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGetProducts } from "../api-store";
import { KeyLocalStorage, RequestStatus } from "../../const";
import { TProducts } from "../../type/product";
import { addAndDeleteValueToLocalStorage, deleteAndCreateProductLocalStorage, getDataLocalStorage } from "../../utils";
import { TFormCreateProduct } from "../../type/form-create-product";

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
    like: false,
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
    initialState: (state) => {
      const createProducts = getDataLocalStorage(KeyLocalStorage.NEW_PRODUCTS);
      
      if (createProducts === null) {
        return;
      }
      const products = JSON.parse(createProducts) as TProducts[];
      console.log(products)
      state.products = [...state.products, ...products];
      state.productsFilter = [...state.productsFilter, ...products];
    },
    deleteProduct: (state, action: PayloadAction<{id: string}>) => {
      const id = action.payload.id;
      const idProduct = getDataLocalStorage(KeyLocalStorage.LIKE);
      const products = getDataLocalStorage(KeyLocalStorage.NEW_PRODUCTS);
      let idProductNumber: number [] = [];
      let productsFormat: TProducts[] = [];
      let product: TProducts | undefined = undefined;

      if (idProduct) {
        idProductNumber = JSON.parse(idProduct);
      }

      if (products) {
        productsFormat = JSON .parse(products);
        product = productsFormat.find((e) => e.gameID === id);
      }

      if (product !== undefined) {
        deleteAndCreateProductLocalStorage(product);
      }

      state.products = state.products.filter((element) => element.gameID !== id);
      state.productsFilter = state.products.filter((element) => element.gameID !== id);

      if (idProductNumber.includes(+id)) {
        addAndDeleteValueToLocalStorage(KeyLocalStorage.LIKE, id);
      }

      if (state.filterSetting.like) {
        console.log(';')
        state.productsFilter = state.productsFilter.filter((e) => idProductNumber.includes(+e.gameID));
      }
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
    },
    createProduct: (state, action: PayloadAction<{product: TFormCreateProduct}>) => {
      const product = action.payload.product;
      const newProduct = { ...state.products[0], ...product };

      state.products = [...state.productsFilter, newProduct];
      state.productsFilter = [...state.productsFilter, newProduct];
      
      deleteAndCreateProductLocalStorage(newProduct);
    }
  },
  selectors: {
    products: (state) => state.products,
    statusProduct: (state) => state.statusProduct,
    productsFilter: (state) => state.productsFilter,
    filterSetting: (state) => state.filterSetting,
  }
})

const actionsProduct = productSlice.actions;
const selectorsProduct = productSlice.selectors;

export { productSlice, actionsProduct, selectorsProduct }