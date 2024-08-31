import Container from "../components/container";
import {Link} from 'react-router-dom/dist'
import { AppRoute } from "../const";
import ListProduct from "../components/list-products";
import { useEffect, useState } from "react";
import React from "react";
import { useAppDispatch } from "../type/indexStore";
import { fetchGetProducts } from "../store/api-store";
import { actionsProduct } from "../store/slice/product";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const [isFilter, setIsFilter] = useState<boolean>(false);
  useEffect(() => {
    dispatch(fetchGetProducts());
  }, [])

  function onFilterProduct() {
    dispatch(actionsProduct.filterProduct({like: !isFilter}));
    setIsFilter(!isFilter);
  }

  return (
    <Container>
      <>
      <div className="main__top">
        <div className="pagination">
          <ul className="pagination__list">
            <li className="pagination__item">
              <Link to={`${AppRoute.INDEX}`} className="pagination__link">
                Главная
              </Link>
            </li>
          </ul>
        </div>
        <div className="filter">
          <h2 className="filter__title">Фильтр:</h2>
          <div className="filter__row">
            <input type="checkbox" className="filter__input visually-hidden" id="like" name="like" checked={isFilter}/>
            <label htmlFor="like" className="filter__label" onClick={onFilterProduct}>
              Избранные
            </label>
          </div>
        </div>
      </div>
      <div className="main__content">
        <ListProduct />
      </div>
      </>
    </Container>
  )
}