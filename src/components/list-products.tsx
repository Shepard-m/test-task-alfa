import React from "react";
import Product from "./product";
import { useAppSelector } from "../type/indexStore";
import { productSlice, selectorsProduct } from "../store/slice/product";



export default function ListProduct() {
  const selector = useAppSelector;
  const productsFilter = selector(selectorsProduct.productsFilter);

  return (
    <ul className="products">
      {productsFilter.map((product) => <Product key={product.gameID} product={product}/>)}
    </ul>
  )
}