import UserModel from '../models/UserModel';

/**
 * Get users from window.localstorage, parse and return them
 * @returns {UserModel[]} users
 */
export const getUsersFromLocalStorage = (userType: string) => {
  return JSON.parse(
    window.localStorage.getItem(userType) || '[]'
  ) as UserModel[];
};

/**
 * A validity check to see the entry exists in localstorage or not
 * @returns {boolean}
 */
export const validateLocalStorageData = (userType: string) => {
  if (window.localStorage.getItem(userType)) {
    return true;
  }
  return false;
};

/**
 * Helper method to check if user already exists in the list of retrieved users
 * @param {UserModel[]} users
 * @param {UserModel} user
 * @returns { boolean }
 */
export const isUserExists = (users: UserModel[], user: UserModel) => {
  for (const topUser of users) {
    if (topUser.name === user.name) return true;
  }
  return false;
};
