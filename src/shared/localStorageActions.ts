const setLoginData = (email: string): void => {
  localStorage.setItem('email', JSON.stringify(email));
};

const getLoginData = (): void => {
  const data = localStorage.getItem('loginData');
  return data && JSON.parse(data);
};

const removeLoginData = (): void => localStorage.removeItem('loginData');

const setCurrentUser = (id: string, data: { [key: string]: string }): void => {
  console.log(data);
  localStorage.setItem('currentUser', JSON.stringify({ id, ...data }));
};

const getCurrentUser = (): void => {
  const data = localStorage.getItem('currentUser');
  return data && JSON.parse(data);
};

const updateCurrentUser = (
  prevData: { [key: string]: string },
  data: { [key: string]: string },
): void => {
  localStorage.setItem('currentUser', JSON.stringify({ ...prevData, ...data }));
};

const removeCurrentUser = (): void => localStorage.removeItem('currentUser');

export const localStorageActions = {
  setLoginData,
  getLoginData,
  removeLoginData,
  setCurrentUser,
  getCurrentUser,
  updateCurrentUser,
  removeCurrentUser,
};
