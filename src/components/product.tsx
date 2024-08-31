import { Link, useNavigate } from "react-router-dom/dist";
import { AppRoute, KeyLocalStorage } from "../const";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { TProducts } from "../type/product";
import { useAppDispatch } from "../type/indexStore";
import { actionsProduct } from "../store/slice/product";
import { addAndDeleteValueToLocalStorage, getDataLocalStorage } from "../utils";

type TProduct = {
  product: TProducts;
}

export default function Product({ product }: TProduct) {
  const [ isLike, setIsLike ] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const idProduct = getDataLocalStorage(KeyLocalStorage.LIKE);
  let idProductNumber: number[] = [];
  if (idProduct) {
     idProductNumber = JSON.parse(idProduct);
  }

  useEffect(() => {
    if (idProductNumber.includes(+product.gameID)) {
      setIsLike(true);
    }
  }, [])

  function onEvaluateProduct() {
    addAndDeleteValueToLocalStorage(KeyLocalStorage.LIKE, product.gameID);
    setIsLike(!isLike)
  }

  function onDeleteProduct(evt: SyntheticEvent<HTMLButtonElement>) {
    const id = evt.currentTarget.dataset.id;
    if (id) {
      dispatch(actionsProduct.deleteProduct({id}))
    }
  }

  function onOpenPageProductClick(evt: SyntheticEvent<JSX.Element | HTMLLIElement>) {
    if (!(evt.target.closest('.products__button')) && !(evt.target.closest('.products__review-platform')) && !(evt.target.closest('.products__like'))) {
      navigate(`${AppRoute.PRODUCT}/${product.gameID}`)
    }
  }

  return (
    <li className="products__item" onClick={onOpenPageProductClick}>
      <img src={product.thumb} alt={product.title} className="products__preview" width={320} height={300} />
      <h3 className="products__title">
        {product.title}
      </h3>
      <p className="products__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, dolorem quia eligendi explicabo quod
        molestiae tenetur officiis saepe sint deserunt nemo iste ipsum alias? Quaerat, quod. Exercitationem,
        maiores eligendi! Totam!
      </p>
      <div className="products__info">
        <span className={`products__like ${isLike && 'products__like--active'}`} onClick={onEvaluateProduct}/>
        <div className="products__review">
          <Link to={`https://www.metacritic.com${product.metacriticLink}`}>
          <img src="../src/assets/metacritic.svg" width={32} height={32} alt={'metacritic'} className="products__review-platform" />
          </Link>
          <span className="products__review-count">{product.metacriticScore}</span>
        </div>
      </div>
      <button className="products__button products__button--delete" data-id={product.gameID} onClick={onDeleteProduct}>
        <span className="visually-hidden">Удалить</span>
      </button>
      <Link to={AppRoute.INDEX} className="products__button products__button--edit">
        <span className="visually-hidden">Редактировать</span>
      </Link>
    </li>
  )
}