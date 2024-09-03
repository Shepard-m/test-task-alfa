import { Link, useNavigate } from "react-router-dom/dist";
import { AppRoute, FormField, KeyLocalStorage, OptionValidationFormCreateProduct, scrollLock, TextErrorsFormCreateProduct } from "../const";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { TProducts } from "../type/product";
import { useAppDispatch, useAppSelector } from "../type/indexStore";
import { actionsProduct, selectorsProduct } from "../store/slice/product";
import { addAndDeleteValueToLocalStorage, getDataLocalStorage } from "../utils";
import { useForm } from "react-hook-form";
import { TCreateProductValidation } from "../type/create-product-validation";

type TProduct = {
  product: TProducts;
}

export default function Product({ product }: TProduct) {
  const [ isLike, setIsLike ] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TCreateProductValidation>();
  const [formModal, setFormModal] = useState({
    title: product.title,
    thumb: product.thumb,
    normalPrice: product.normalPrice,
    steamRatingPercent: product.steamRatingPercent,
    metacriticScore: product.metacriticScore,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filterSettings = useAppSelector(selectorsProduct.filterSetting);
  const idProduct = getDataLocalStorage(KeyLocalStorage.LIKE);
  let idProductNumber: number[] = [];
  if (idProduct) {
     idProductNumber = JSON.parse(idProduct);
  }

  useEffect(() => {
    const body = document.querySelector('body');

    if (isOpenModal && body) {
      body.classList.add(scrollLock);
      return;
    } else if (body) {
      body.classList.remove(scrollLock);
    }

  }, [isOpenModal])

  useEffect(() => {
    if (idProductNumber.includes(+product.gameID)) {
      setIsLike(true);
    }
  }, [])

  function onOpenModalClick() {
    setIsOpenModal(true);
  }

  function onSendEditProductSubmit() {
    dispatch(actionsProduct.editProduct({product: formModal, id: +product.gameID}));
    setIsOpenModal(false);
  }

  function onInputFieldChange(evt: SyntheticEvent<HTMLInputElement>) {
    const row = evt.currentTarget.name;
    const data = evt.currentTarget.value;

    switch (row) {
      case FormField.TITLE: {
        setFormModal({...formModal, title: data});
        break;
      }
      case FormField.THUMB: {
        setFormModal({...formModal, thumb: data});
        break;
      }
      case FormField.NORMAL_PRICE: {
        setFormModal({...formModal, normalPrice: data});
        break;
      }
      case FormField.STEAM_RATING_PERCENT: {
        setFormModal({...formModal, steamRatingPercent: data});
        break;
      }
      case FormField.METACRITIC_SCORE: {
        setFormModal({...formModal, metacriticScore: data});
        break;
      }
    }
  }

  function onCloseModalClick() {
    setIsOpenModal(false)
  }

  function onEvaluateProduct() {
    addAndDeleteValueToLocalStorage(KeyLocalStorage.LIKE, product.gameID);
    setIsLike(!isLike);
    if (filterSettings.like) {
      dispatch(actionsProduct.filterProduct({like: true}));
    }
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
    <>    
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
      <button className="products__button products__button--edit" onClick={onOpenModalClick}>
        <span className="visually-hidden">Редактировать</span>
      </button>
    </li>
    {isOpenModal &&     
    <div className={'modal modal--active'}>
      <div className="modal__content">
        <div className="modal__wrapper">
        <h2 className="modal__title">
          Редактирование
        </h2>
        <form className="modal__form" onSubmit={(event) => {
              void handleSubmit(onSendEditProductSubmit)(event)
            }}>
          <div className="form__row">
            <label htmlFor="title" className="form__label">
              Название товара
            </label>
            <input type="text" id="title" value={formModal.title} className="form__input" 
            {...register('title', {
              minLength: {
                value: OptionValidationFormCreateProduct.TITLE.min,
                message: TextErrorsFormCreateProduct.TITLE.min
              },
              maxLength: {
                value: OptionValidationFormCreateProduct.TITLE.max,
                message: TextErrorsFormCreateProduct.TITLE.max
              },
              onChange: onInputFieldChange
            })} />
            {errors?.title &&
              <span style={{ color: 'red' }}> {errors.title.message} </span>}
          </div>
          <div className="form__row">
            <label htmlFor="thumb" className="form__label">
              Ссылка на изображение
            </label>
            <input type="text" id="thumb" value={formModal.thumb} className="form__input" 
            {...register('thumb', {
              minLength: {
                value: OptionValidationFormCreateProduct.THUMB.min,
                message: TextErrorsFormCreateProduct.THUMB.min
              },
              onChange: onInputFieldChange
            })}/>
            {errors?.thumb &&
              <span style={{ color: 'red' }}> {errors.thumb.message} </span>}
          </div>
          <div className="form__row">
            <label htmlFor="normalPrice" className="form__label">
              Цена товара
            </label>
            <input type="text" id="normalPrice" value={formModal.normalPrice} className="form__input"
            {...register('normalPrice', {
              minLength: {
                value: OptionValidationFormCreateProduct.NORMAL_PRICE.min,
                message: TextErrorsFormCreateProduct.NORMAL_PRICE.min
              },
              maxLength: {
                value: OptionValidationFormCreateProduct.NORMAL_PRICE.max,
                message: TextErrorsFormCreateProduct.NORMAL_PRICE.max
              },
              onChange: onInputFieldChange
            })}/>
            {errors?.normalPrice &&
              <span style={{ color: 'red' }}> {errors.normalPrice.message} </span>}
          </div>
          <div className="form__row">
            <label htmlFor="steamRatingPercent" className="form__label">
              Оценка в стиме
            </label>
            <input type="text" id="steamRatingPercent" value={formModal.steamRatingPercent} className="form__input" 
              {...register('steamRatingPercent', {
                minLength: {
                  value: OptionValidationFormCreateProduct.STEAM_RATING_PERCENT.min,
                  message: TextErrorsFormCreateProduct.STEAM_RATING_PERCENT.min
                },
                maxLength: {
                  value: OptionValidationFormCreateProduct.STEAM_RATING_PERCENT.max,
                  message: TextErrorsFormCreateProduct.STEAM_RATING_PERCENT.max
                },
                onChange: onInputFieldChange
              })}
            />
          </div>
          <div className="form__row">
            <label htmlFor="metacriticScore" className="form__label">
              Оценка на metacritic
            </label>
            <input type="text" id="metacriticScore" value={formModal.metacriticScore} className="form__input" 
              {...register('metacriticScore', {
                minLength: {
                  value: OptionValidationFormCreateProduct.METACRITIC_SCORE.min,
                  message: TextErrorsFormCreateProduct.METACRITIC_SCORE.min
                },
                maxLength: {
                  value: OptionValidationFormCreateProduct.METACRITIC_SCORE.max,
                  message: TextErrorsFormCreateProduct.METACRITIC_SCORE.max
                },
                onChange: onInputFieldChange
              })}
            />
          </div>
          <button className="modal__send">
            <span> Изменить данные </span>
          </button>
        </form>
        <button className="modal__close" onClick={onCloseModalClick}>
          <span className="visually-hidden">Закрыть окно редактирования</span>
        </button>
        </div>
      </div>
    </div>
    }
    </>
  )
}