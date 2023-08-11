function getStorage(storageName) {
  console.log('success get storage');
  return localStorage.getItem(storageName);
}

function setStorage(storageName, data) {
  localStorage.setItem(storageName, JSON.stringify(data));
  console.log('success set storage');
}

export { getStorage, setStorage};