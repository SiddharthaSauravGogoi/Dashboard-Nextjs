import UserModel from '../models/UserModel';

/**
 * Get users from localstorage, parse and return them
 * @returns {UserModel[]} users
 */
export const getTopUsersFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('topusers') || '[]') as UserModel[];
};
