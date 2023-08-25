function getStorage(storageName) {
  console.log('success get storage ' + storageName);
  
  let ls = localStorage.getItem(storageName);
  if (!ls) {
    return null
  }
  
  ls = localStorageExpired(storageName, ls);
  
  return ls;
}

function setStorage(storageName, data) {
  console.log('success set storage');

  const now = new Date();
  data = {'expired': now, data };
  localStorage.setItem(storageName, JSON.stringify(data));
}

function localStorageExpired (storageName, dataLocalStorage) {

  const item = JSON.parse(dataLocalStorage)
  const now = new Date()
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expired) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(storageName)
      return null
  }

  return dataLocalStorage
}

export { getStorage, setStorage};