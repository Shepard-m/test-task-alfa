export const AppRoute = {
  INDEX: '/',
  PRODUCT: '/product',
  CREATE_PRODUCT: '/create-product'
}

export const ApiRoute = {
  PRODUCTS: 'deals?storeID=1&upperPrice=15',
}

export const RequestStatus = {
  SUCCESS: 'success',
  LOADING: 'loading',
  FAILED: 'failed',
  NONE: 'none'
};

export const KeyLocalStorage = {
  LIKE: 'like',
  NEW_PRODUCTS: 'create-products',
}

export const FormField = {
  TITLE: 'title',
  THUMB: 'thumb',
  NORMAL_PRICE: 'normalPrice',
  STEAM_RATING_PERCENT: 'steamRatingPercent',
  METACRITIC_SCORE: 'metacriticScore',
  GAME_ID: 'gameID',
}

export const OptionValidationFormCreateProduct = {
  TITLE: {
    min: 1,
    max: 30,
  },
  THUMB: {
    min: 1,
  },
  NORMAL_PRICE: {
    min: 1,
    max: 10,
  },
  STEAM_RATING_PERCENT: {
    min: 1,
    max: 3,
  },
  METACRITIC_SCORE: {
    min: 1,
    max: 3,
  },
  GAME_ID: {
    min: 1,
    max: 10,
  },
}
export const TextErrorsFormCreateProduct = {
  TITLE: {
    min: 'Минимальная длина 1 символ',
    max: 'Максимальная длина 30 символов',
  },
  THUMB: {
    min: 'Минимальная длина 1 символ',
  },
  NORMAL_PRICE: {
    min: 'Минимальная длина 1 символ',
    max: 'Максимальная длина 10 символов',
  },
  STEAM_RATING_PERCENT: {
    min: 'Минимальная длина 1 символ',
    max: 'Максимальная длина 3 символа',
  },
  METACRITIC_SCORE: {
    min: 'Минимальная длина 1 символ',
    max: 'Максимальная длина 3 символа',
  },
  GAME_ID: {
    min: 'Минимальная длина 1 символ',
    max: 'Максимальная длина 10 символов',
  },
}

export const TextSuccess = {
  CREATE_PRODUCT: 'Товар успешно создан',
}

export const scrollLock = 'scroll-lock';