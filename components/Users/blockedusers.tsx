import React from 'react';
import UserModel from '../../models/UserModel';
import styles from '../../styles/Table.module.css';

type Props = {
  blockedUsers: UserModel[];
};

const BlockedUsers = (props: Props) => {
  return (
    <div className={styles.blocked}>
      {props.blockedUsers.length >= 1 && (
        <p className={styles.m8}>
          <em> Click on a blocked user once again to unblock them. </em> <br />
          <em> Make sure the toggle switch is on!</em>
        </p>
      )}
      {props.blockedUsers.map((user) => (
        <p className={styles.m8} key={user.id}>
          {user.name} is blocked
        </p>
      ))}
    </div>
  );
};

export default BlockedUsers;
