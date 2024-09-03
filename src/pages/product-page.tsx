import React, { useEffect } from "react";
import Container from "../components/container";
import { Link, useParams } from "react-router-dom/dist";
import { AppRoute } from "../const";
import { useAppDispatch, useAppSelector } from "../type/indexStore";
import { fetchGetProducts } from "../store/api-store";
import { actionsProduct, selectorsProduct } from "../store/slice/product";

export default function ProductPage() {
  const { gameId } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectorsProduct.products);
  const product = products.find((element) => element.gameID === gameId);

  useEffect(() => {
    dispatch(fetchGetProducts())
    .unwrap()
    .then(() => {
      console.log('k')
      dispatch(actionsProduct.initialState())
    });
  }, [])

  return (
    <Container>
      <>
        <div>
          <div className="pagination">
            <ul className="pagination__list">
              <li className="pagination__item">
                <Link to={AppRoute.INDEX} className="pagination__link">
                  Главная
                </Link>
              </li>
              <li className="pagination__item">
                <span className="pagination__link">
                  {product?.title}
                </span>
              </li>
            </ul>
          </div>
          <div className="main__content">
            <div className="info-product">
              <img src={product?.thumb} alt={`Изображение игры: ${product?.title}`} height={500} width={500} className="info-product__preview" />
              <div className="info-product__content">
                <h2 className="info-product__title">{product?.title}</h2>
                <span className="info-product__price">Цена: {product?.normalPrice}$</span>
                <div className="info-product__reviews">
                  <h2 className="info-product__reviews-title">Оценка на сервисах:</h2>
                  <div className="info-product__reviews-wrapper">
                    <div className="info-product__review">
                      <img src="./img/metacritic.svg" alt={'metacritic'} width={32} height={32} />
                      <span className="info-product__review-count">{product?.metacriticScore}</span>
                    </div>
                    <div className="info-product__review">
                      <img src="./img/steam.svg" alt={'steam'} width={32} height={32} />
                      <span className="info-product__review-count">{product?.steamRatingPercent}</span>
                    </div>
                  </div>
                </div>
                <span className="info-product__date">Дата релиза: 21.09.06</span>
              </div>
            </div>
          </div>
        </div>

      </>
    </Container>
  )
}