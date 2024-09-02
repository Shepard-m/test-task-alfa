import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <img src="../assets/game-logo.jpg" width={20} height={20} alt="Logo" className="header__logo" />
          <div className="header__left">
            <ul className="header__list">
              <li className="header__item">
                <Link to={AppRoute.INDEX} className="header__link">
                  Главная
                </Link>
              </li>
              <li className="header__item">
                <Link to={AppRoute.CREATE_PRODUCT} href className="header__link">
                  Создать продукт
                </Link>
              </li>
            </ul>
            <div className="form-search">
              <form>
                <label>
                  <svg className="form-search__icon" width={16} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-lens" />
                  </svg>
                  <input className="form-search__input" autoComplete="off" placeholder="Поиск по сайту" type="text" />
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