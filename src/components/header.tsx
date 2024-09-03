import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useAppSelector } from "../type/indexStore";
import { selectorsProduct } from '../store/slice/product';
import {TProducts} from '../type/product';
import React from 'react';

export default function Header() {
  const [ valueSearch, setValueSearch ] = useState('');
  const [ isOpenSearch, setIsOpenSearch ] = useState(false);
  const [productsSearch, setProductsSearch] = useState<TProducts[]>([]);
  const products = useAppSelector(selectorsProduct.products);

  useEffect(() => {
    if (valueSearch !== '') {
      setIsOpenSearch(true);
    } else {
      setIsOpenSearch(false);
    }
    setProductsSearch(products.filter((e) => e.title.toLowerCase().includes(valueSearch.toLowerCase())));
  }, [valueSearch])

  function onSearchProductsChange(evt: SyntheticEvent<HTMLInputElement>) {
    setValueSearch(evt.currentTarget.value);
  }
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <img src="../src/assets/game-logo.jpg" width={20} height={20} alt="Logo" className="header__logo" />
          <div className="header__left">
            <ul className="header__list">
              <li className="header__item">
                <Link to={AppRoute.INDEX} className="header__link">
                  Главная
                </Link>
              </li>
              <li className="header__item">
                <Link to={AppRoute.CREATE_PRODUCT} className="header__link">
                  Создать продукт
                </Link>
              </li>
            </ul>
            <div className={`form-search ${isOpenSearch ? 'list-opened' : ''}`}>
              <form>
                <label>
                  <svg className="form-search__icon" width={16} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-lens" />
                  </svg>
                  <input className="form-search__input" value={valueSearch} autoComplete="off" placeholder="Поиск по сайту" type="text" onChange={onSearchProductsChange}/>
                  {productsSearch.length > 0 
                  &&
                  <ul className="form-search__select-list">
                    {productsSearch.map((e) => <Link to={`${AppRoute.PRODUCT}/${e.gameID}`}><li key={e.gameID} className="form-search__select-item">{e.title}</li></Link>)}
                  </ul>
                  }
                </label>
              </form>
              <button className="form-search__reset">
                <svg width={10} height={10} aria-hidden="true">
                  <use xlinkHref="#icon-close" />
                </svg>
                <span className="visually-hidden">
                  Сбросить поиск
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}