import React, { useCallback } from 'react';
import UserModel from '../../models/UserModel';
import { getTopUsersFromLocalStorage } from '../../shared/helper';
import styles from '../../styles/Table.module.css';
import UserDisplay from './userdisplay';

type Props = {
  userData: UserModel[];
  query: string;
};

const UserTable = (props: Props) => {
  const [userSelection, setUserSelection] = React.useState<UserModel>();

  /**
   * 1. Checks if data already exists for topusers
   * 2. If doesn't, set a new array of users to localstorage with key topusers
   * 3. if data exists however, we need to check if user already exists in that data
   * 4. if users exists, remove him and update localstorage otherwise add him and update the data
   * @param {UserModel} user
   */
  const handleTopUsers = useCallback((user: UserModel) => {
    if (validateLocalStorageData()) {
      const users = getTopUsersFromLocalStorage();
      isUserExists(users, user)
        ? removeUser(users, user)
        : addUser(users, user);
    } else {
      localStorage.setItem('topusers', JSON.stringify([user]));
    }
  }, []);

  /**
   * Top level function to handle different target clicks
   * @param { UserModel } user
   */
  const handleUserData = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, user: UserModel) => {
      const tag = (e.target as HTMLInputElement).tagName;
      if (
        tag !== 'INPUT' &&
        props.query.length >= 1 &&
        props.query.match(/^[\w\-\s]+$/)
      ) {
        setUserSelection(user);
        return;
      }
      handleTopUsers(user);
    },
    [props.query, handleTopUsers]
  );

  /**
   * Filter users with the selected name since it already exists
   * If the result is an empty array, clear the entry in the localstorage
   * @param {UserModel[]} users
   * @param {UserModel} user
   */
  const removeUser = (users: UserModel[], user: UserModel) => {
    const topUsers = users.filter((topUsers) => topUsers.name !== user.name);
    !topUsers.length
      ? localStorage.removeItem('topusers')
      : localStorage.setItem('topusers', JSON.stringify(topUsers));
  };

  /**
   * Add user to already existing users in localstorage and update
   * @param {UserModel[]} users
   * @param {UserModel} user
   */
  const addUser = (users: UserModel[], user: UserModel) => {
    localStorage.setItem('topusers', JSON.stringify([...users, user]));
  };

  /**
   * A validity check to see the entry exists in localstorage or not
   * @returns {boolean}
   */
  const validateLocalStorageData = () => {
    if (localStorage.getItem('topusers')) {
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
  const isUserExists = (users: UserModel[], user: UserModel) => {
    for (const topUser of users) {
      if (topUser.name === user.name) return true;
    }
    return false;
  };

  /**
   * setting selection to 'undefined' short circuits the jsx expression, in result clearing it
   */
  const clearUserDisplay = () => {
    setUserSelection(undefined);
  };

  /**
   * Method called from jsx to set checkbox value
   * @param { UserModel} user
   * @returns { boolean }
   */
  const checkIfExists = (user: UserModel) => {
    const users = getTopUsersFromLocalStorage();
    for (const topUser of users) {
      if (topUser.email === user.email) return true;
    }
    return false;
  };

  /**
   * listen to query and clear selection if it's non existent
   */
  React.useEffect(() => {
    if (props.query.length <= 1) clearUserDisplay;
  }, [props.query]);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Top User</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {props.userData
            .filter((user: UserModel) => {
              if (props.query === '') {
                return user;
              } else if (
                user.name.toLowerCase().includes(props.query.toLowerCase()) ||
                user.email.toLowerCase().includes(props.query.toLowerCase())
              ) {
                return user;
              }
            })
            .map((user: UserModel) => (
              <tr
                className={`${
                  props.query.length >= 1 ? `${styles.cPointer}` : ''
                }`}
                key={user.id}
                onClick={(e) => handleUserData(e, user)}
              >
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={checkIfExists(user) ? true : false}
                  />
                </td>
                <td> {user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <UserDisplay
        userSelection={userSelection}
        clearUserDisplay={clearUserDisplay}
      />
    </>
  );
};

export default UserTable;
