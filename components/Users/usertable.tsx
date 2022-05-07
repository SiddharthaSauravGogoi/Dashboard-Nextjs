import React from 'react';
import UserModel from '../../models/UserModel';
import styles from '../../styles/Table.module.css';
import UserDisplay from './userdisplay';

type Props = {
  userData: UserModel[];
  query: string;
};

const UserTable = (props: Props) => {
  const [userSelection, setUserSelection] = React.useState<UserModel>();

  /**
   * Display only is query length
   * @param { UserModel } user
   */
  const handleUserData = (user: UserModel) => {
    if (props.query.length >= 1 && props.query.match(/^[\w\-\s]+$/)) {
      setUserSelection(user);
    }
  };

  /**
   * listen to query and clear selection if it's non existent
   */
  React.useEffect(() => {
    if (props.query.length <= 1) clearUserDisplay;
  }, [props.query]);

  /**
   * setting selection to 'undefined' short circuits the jsx expression, in result clearing it
   */
  const clearUserDisplay = () => {
    setUserSelection(undefined);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
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
              <tr key={user.id} onClick={() => handleUserData(user)}>
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
