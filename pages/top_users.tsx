import React from 'react';
import UserModel from '../models/UserModel';
import styles from '../styles/Table.module.css';
import UserDisplay from '../components/Users/userdisplay';

const TopUsers = () => {
  const [topUsers, setTopUsers] = React.useState<UserModel[]>([]);
  const [userSelection, setUserSelection] = React.useState<UserModel>();

  /**
   * On mount check if users exists in localstorage
   * If they do, fetch and update the state
   */
  React.useEffect(() => {
    const validateLocalStorageData = () => {
      if (localStorage.getItem('topusers')) {
        return true;
      }
      return false;
    };
    if (validateLocalStorageData()) {
      const users = JSON.parse(
        localStorage.getItem('topusers') || '[]'
      ) as UserModel[];
      setTopUsers(users);
    }
  }, []);

  /**
   * Handle user selection
   * @param {UserModel}  user
   */
  const handleUserData = (user: UserModel) => {
    setUserSelection(user);
  };

  /**
   * Clear user selection
   */
  const clearUserDisplay = () => {
    setUserSelection(undefined);
  };

  return (
    <section>
      {topUsers?.length ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {topUsers.map((user: UserModel) => (
              <tr key={user.id} onClick={() => handleUserData(user)}>
                <td> {user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p> No Topusers exists </p>
      )}
      <UserDisplay
        userSelection={userSelection}
        clearUserDisplay={clearUserDisplay}
      />
    </section>
  );
};

export default TopUsers;
