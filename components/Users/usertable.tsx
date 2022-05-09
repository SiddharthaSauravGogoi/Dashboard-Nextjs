import React, { useCallback } from 'react';
import UserModel from '../../models/UserModel';
import {
  getUsersFromLocalStorage,
  validateLocalStorageData,
  isUserExists,
} from '../../shared/helper';
import styles from '../../styles/Table.module.css';
import BlockedUsers from './blockedusers';
import UserDisplay from './userdisplay';

type Props = {
  userData: UserModel[];
  query: string;
  toggle: boolean;
};

const UserTable = (props: Props) => {
  const [userSelection, setUserSelection] = React.useState<UserModel>();
  const [blockedUsers, setBlockedUsers] = React.useState<UserModel[]>([]);
  const fiveMinsInMilliSeconds = 300000;

  /**
   * Check for blocked users and remove them if it has already been over 5 mins
   * If there is still time left to unblock them, clear their timeout with the remaining time left;
   * Function runs only on page mount
   */
  const checkForBlockedUsers = useCallback((users: UserModel[]) => {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const finalResult: UserModel[] = [];

    for (const user of users) {
      if (user.blockedAt) {
        if (!(currentTime - user.blockedAt >= 300)) {
          finalResult.push(user);
          window.setTimeout(() => {
            removeUser(user, 'blockedUsers');
          }, fiveMinsInMilliSeconds - (currentTime - user.blockedAt) * 1000);
        }
      }
    }
    !finalResult.length
      ? window.localStorage.removeItem('blockedUsers')
      : window.localStorage.setItem(
          'blockedUsers',
          JSON.stringify(finalResult)
        );
    setBlockedUsers(finalResult);
  }, []);

  /**
   * Check for expired blocked users when page mounts
   */
  React.useEffect(() => {
    const users = getUsersFromLocalStorage('blockedUsers');
    checkForBlockedUsers(users);
  }, [checkForBlockedUsers, props.userData]);

  /**
   * 1. Checks if data already exists for topusers
   * 2. If doesn't, set a new array of users to localstorage with key topusers
   * 3. if data exists however, we need to check if user already exists in that data
   * 4. if users exists, remove him and update localstorage otherwise add him and update the data
   * @param {UserModel} user
   */
  const handleTopUsers = (user: UserModel) => {
    if (validateLocalStorageData('topusers')) {
      const users = getUsersFromLocalStorage('topusers');
      isUserExists(users, user)
        ? removeUser(user, 'topusers')
        : addUser(users, user, 'topusers');
    } else {
      user.blockedAt = Math.floor(new Date().getTime() / 1000);
      window.localStorage.setItem('topusers', JSON.stringify([user]));
    }
  };

  /**
   * Top level function for handling blocking/unblocking of users.
   * Flow is similar to handleTopUsers except settimeout is introduced in different levels of the function when adding and removing users;
   * settimout is used to remove automatically/unblock user after elapsed time i.e. 5 minutes (300000 milliseconds)
   * @param { UserModel } user
   */
  const handleBlocking = (user: UserModel) => {
    if (validateLocalStorageData('blockedUsers')) {
      const users = getUsersFromLocalStorage('blockedUsers');
      isUserExists(users, user)
        ? removeUser(user, 'blockedUsers')
        : addUser(users, user, 'blockedUsers');
    } else {
      const id = window.setTimeout(() => {
        removeUser(user, 'blockedUsers');
      }, fiveMinsInMilliSeconds);
      user.blockedAt = Math.floor(new Date().getTime() / 1000);
      user.timeoutid = id;
      setBlockedUsers([user]);
      window.localStorage.setItem('blockedUsers', JSON.stringify([user]));
    }
  };

  /**
   * Top level function to handle different target clicks on the table row
   * @param { UserModel } user
   */
  const handleUserData = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    user: UserModel
  ) => {
    const tag = (e.target as HTMLInputElement).tagName;
    if (props.toggle) {
      handleBlocking(user);
      return;
    }
    if (
      tag !== 'INPUT' &&
      props.query.length >= 1 &&
      props.query.match(/^[\w\-\s]+$/)
    ) {
      setUserSelection(user);
      return;
    } else if (tag === 'INPUT') {
      handleTopUsers(user);
    }
  };

  /**
   * Filter users with the selected name since it already exists
   * If the result is an empty array, clear the entry in the localstorage
   * @param {UserModel[]} users
   * @param {UserModel} user
   */
  const removeUser = (user: UserModel, userType: string) => {
    const newUsers: UserModel[] = getUsersFromLocalStorage(userType);
    const updatedUsers = newUsers.filter(
      (updatedUsers) => updatedUsers.name !== user.name
    );
    if (userType === 'blockedUsers') {
      clearTimeout(user.timeoutid);
      delete user.timeoutid;
      setBlockedUsers(updatedUsers);
    }
    !updatedUsers.length
      ? window.localStorage.removeItem(userType)
      : window.localStorage.setItem(userType, JSON.stringify(updatedUsers));
  };

  /**
   * Add user to already existing users in localstorage and update
   * @param {UserModel[]} users
   * @param {UserModel} user
   */
  const addUser = (users: UserModel[], user: UserModel, userType: string) => {
    if (userType === 'blockedUsers') {
      user.blockedAt = Math.floor(new Date().getTime() / 1000);
      const id = window.setTimeout(function () {
        removeUser(user, 'blockedUsers');
      }, fiveMinsInMilliSeconds);
      user.timeoutid = id;
      setBlockedUsers([...users, user]);
    }
    window.localStorage.setItem(userType, JSON.stringify([...users, user]));
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
    const users = getUsersFromLocalStorage('topusers');
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
            {!props.toggle && <th>Top User</th>}
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
                {!props.toggle && (
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={checkIfExists(user) ? true : false}
                    />
                  </td>
                )}

                <td> {user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <BlockedUsers blockedUsers={blockedUsers} />
      <UserDisplay
        userSelection={userSelection}
        clearUserDisplay={clearUserDisplay}
      />
    </>
  );
};

export default UserTable;
