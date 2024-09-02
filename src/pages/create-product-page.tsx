import React, { SyntheticEvent, useEffect, useState } from "react";
import Container from "../components/container";
import { Link, useNavigate, useParams } from "react-router-dom/dist";
import { AppRoute, FormField, OptionValidationFormCreateProduct, TextErrorsFormCreateProduct, TextSuccess } from "../const";
import { useAppDispatch, useAppSelector } from "../type/indexStore";
import { fetchGetProducts } from "../store/api-store";
import { actionsProduct, selectorsProduct } from "../store/slice/product";
import { TFormCreateProduct } from "../type/form-create-product";
import { useForm } from "react-hook-form";
import { TCreateProductValidation } from "../type/create-product-validation";
import { toast } from "react-toastify";


export default function CreateProductPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TCreateProductValidation>();
  const [form, setForm] = useState<TFormCreateProduct>({
    title: '',
    thumb: '',
    normalPrice: '',
    steamRatingPercent: '',
    metacriticScore: '',
    gameID: '',
  })
  useEffect(() => {
    dispatch(fetchGetProducts());
  }, [])

  function onInputFieldChange(evt: SyntheticEvent<HTMLInputElement>) {
    const row = evt.currentTarget.name;
    const data = evt.currentTarget.value;

    switch (row) {
      case FormField.TITLE: {
        setForm({...form, title: data});
        break;
      }
      case FormField.THUMB: {
        setForm({...form, thumb: data});
        break;
      }
      case FormField.NORMAL_PRICE: {
        setForm({...form, normalPrice: data});
        break;
      }
      case FormField.STEAM_RATING_PERCENT: {
        setForm({...form, steamRatingPercent: data});
        break;
      }
      case FormField.METACRITIC_SCORE: {
        setForm({...form, metacriticScore: data});
        break;
      }
      case FormField.GAME_ID: {
        setForm({...form, gameID: data});
        break;
      }
    }
  }

  function onSendNewProductSubmit() {
    dispatch(actionsProduct.createProduct({product: form}));
    reset();
    toast.success(TextSuccess.CREATE_PRODUCT);
    navigate(AppRoute.INDEX);
  }

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
                  Создание продукта
                </span>
              </li>
            </ul>
          </div>
          <div className="main__content">
            <form className="form" onSubmit={(event) => {
              void handleSubmit(onSendNewProductSubmit)(event)
            }}>
              <div className="form__row">
                <label htmlFor='title' className="form__label">
                  Название товара
                </label>
                <input type="text" id='title' value={form.title} className="form__input" 
                {...register('title', {
                  minLength: {
                    value: OptionValidationFormCreateProduct.TITLE.min,
                    message: TextErrorsFormCreateProduct.TITLE.min
                  },
                  maxLength: {
                    value: OptionValidationFormCreateProduct.TITLE.max,
                    message: TextErrorsFormCreateProduct.TITLE.max
                  },
                })} onChange={onInputFieldChange}/>
                {errors?.title &&
                  <span style={{ color: 'red' }}> {errors.title.message} </span>}
              </div>
              <div className="form__row">
                <label htmlFor="thumb" className="form__label">
                  Ссылка на изображение
                </label>
                <input type="text" id="thumb" value={form.thumb} className="form__input" 
                {...register('thumb', {
                  minLength: {
                    value: OptionValidationFormCreateProduct.THUMB.min,
                    message: TextErrorsFormCreateProduct.THUMB.min
                  },
                })} onChange={onInputFieldChange}/>
                {errors?.thumb &&
                  <span style={{ color: 'red' }}> {errors.thumb.message} </span>}
              </div>
              <div className="form__row">
                <label htmlFor="normalPrice" className="form__label">
                  Цена товара
                </label>
                <input type="text" id="normalPrice" value={form.normalPrice} className="form__input" 
                {...register('normalPrice', {
                  minLength: {
                    value: OptionValidationFormCreateProduct.NORMAL_PRICE.min,
                    message: TextErrorsFormCreateProduct.NORMAL_PRICE.min
                  },
                  maxLength: {
                    value: OptionValidationFormCreateProduct.NORMAL_PRICE.max,
                    message: TextErrorsFormCreateProduct.NORMAL_PRICE.max
                  },
                })}onChange={onInputFieldChange} />
                {errors?.normalPrice &&
                  <span style={{ color: 'red' }}> {errors.normalPrice.message} </span>}
              </div>
              <div className="form__row">
                <label htmlFor="steamRatingPercent" className="form__label">
                  Оценка в стиме
                </label>
                <input type="text" id="steamRatingPercent" value={form.steamRatingPercent} className="form__input" 
                {...register('steamRatingPercent', {
                  minLength: {
                    value: OptionValidationFormCreateProduct.STEAM_RATING_PERCENT.min,
                    message: TextErrorsFormCreateProduct.STEAM_RATING_PERCENT.min
                  },
                  maxLength: {
                    value: OptionValidationFormCreateProduct.STEAM_RATING_PERCENT.max,
                    message: TextErrorsFormCreateProduct.STEAM_RATING_PERCENT.max
                  },
                })} onChange={onInputFieldChange}/>
                {errors?.steamRatingPercent &&
                  <span style={{ color: 'red' }}> {errors.steamRatingPercent.message} </span>}
              </div>
              <div className="form__row">
                <label htmlFor="metacriticScore" className="form__label">
                  Оценка на metacritic
                </label>
                <input type="text" id="metacriticScore" className="form__input" 
                {...register('metacriticScore', {
                  minLength: {
                    value: OptionValidationFormCreateProduct.METACRITIC_SCORE.min,
                    message: TextErrorsFormCreateProduct.METACRITIC_SCORE.min
                  },
                  maxLength: {
                    value: OptionValidationFormCreateProduct.METACRITIC_SCORE.max,
                    message: TextErrorsFormCreateProduct.METACRITIC_SCORE.max
                  },
                })}
                onChange={onInputFieldChange}/>
                {errors?.metacriticScore &&
                  <span style={{ color: 'red' }}> {errors.metacriticScore.message} </span>}
              </div>
              <div className="form__row">
                <label htmlFor="gameID" className="form__label">
                  ID товара
                </label>
                <input type="text" id="gameID" className="form__input" 
                {...register('gameID', {
                  minLength: {
                    value: OptionValidationFormCreateProduct.GAME_ID.min,
                    message: TextErrorsFormCreateProduct.GAME_ID.min
                  },
                  maxLength: {
                    value: OptionValidationFormCreateProduct.GAME_ID.max,
                    message: TextErrorsFormCreateProduct.GAME_ID.max
                  },
                })}
                onChange={onInputFieldChange}/>
                {errors?.gameID &&
                  <span style={{ color: 'red' }}> {errors.gameID.message} </span>}
              </div>
              <button className="form__button">
                Создать форму
              </button>
            </form>
          </div>
        </div>
      </>
    </Container>
  )
}
