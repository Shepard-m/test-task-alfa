import { useState } from 'react'
import { Route, Routes } from 'react-router-dom/dist';
import { AppRoute } from './const';
import ProductsPage from './pages/products-page';
import React from 'react';
import ProductPage from './pages/product-page';
import CreateProductPage from './pages/create-product-page';
import NotFoundPage from './pages/not-found-page/not-found-page';

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path={AppRoute.INDEX}>
        <Route
          index
          element={<ProductsPage />}
        />
        <Route
          path={`${AppRoute.PRODUCT}/:gameId`}
          element={<ProductPage />}
        />
        <Route
          path={`${AppRoute.CREATE_PRODUCT}`}
          element={<CreateProductPage />}
        />
        <Route
          path={`${AppRoute.NOT_FOUND_PAGE}`}
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  )
}
