import { KeyLocalStorage } from "./const";
import { TProducts } from "./type/product";

export function getDataLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  if (data !== null) {
    return data;
  }
  return null;
}

export function addAndDeleteValueToLocalStorage(key: string, data: string): void {
  const dataStorage = getDataLocalStorage(key);

  if (dataStorage === null) {
    localStorage.setItem(key, JSON.stringify([+data]));
    return;
  }

  let copyStorage: number[] = JSON.parse(dataStorage);
  console.log(copyStorage)
  if (copyStorage.includes(+data)) {
    copyStorage = copyStorage.filter((e) => e !== +data);
    console.log(copyStorage);
  } else {
    copyStorage.push(+data);
  }

  localStorage.setItem(key, JSON.stringify([...copyStorage]));
}

export function deleteAndCreateProductLocalStorage(product: TProducts) {
  const key = KeyLocalStorage.NEW_PRODUCTS;
  const products = getDataLocalStorage(key);

  if (!products) {
    localStorage.setItem(key, JSON.stringify([product]));
    return;
  }

  console.log(product)
  let copyProductsStorage: TProducts[] = JSON.parse(products);
  const idProducts = copyProductsStorage.map((e) => +e.gameID);

  if (idProducts.includes(+product.gameID)) {
    copyProductsStorage = copyProductsStorage.filter((e) => e.gameID !== product?.gameID);
    localStorage.setItem(key, JSON.stringify([...copyProductsStorage]));
    if (copyProductsStorage.length === 0) {
      localStorage.removeItem(KeyLocalStorage.NEW_PRODUCTS);
    }
  } else {
    localStorage.setItem(key, JSON.stringify([...copyProductsStorage]));
  }
}