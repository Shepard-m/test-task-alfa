export function addAndDeleteValueToLocalStorage(key: string, data: string): void {
  const dataStorage = localStorage.getItem(key);
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

  console.log(copyStorage, data);

  localStorage.setItem(key, JSON.stringify([...copyStorage]));
}

export function getDataLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  if (data !== null) {
    return data;
  }
  return null;
}

// export function addValueToLocalStorage(key: string, value: string): void {
//   const currentValue = localStorage.getItem(key);
//   if (currentValue && !currentValue?.includes(value)) {
//     localStorage.setItem(key, `${currentValue}, ${value}`);
//     return;
//   }
//   if (currentValue) {
//     localStorage.setItem(key, currentValue);
//     return;
//   }

//   localStorage.setItem(key, value);
// }