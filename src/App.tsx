import { useState } from 'react'
import { Route, Routes } from 'react-router-dom/dist';
import { AppRoute } from './const';
import ProductsPage from './pages/products-page';
import React from 'react';
import ProductPage from './pages/product-page';

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
      </Route>
    </Routes>
  )
}
