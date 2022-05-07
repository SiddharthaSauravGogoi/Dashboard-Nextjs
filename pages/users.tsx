import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import UserModel from '../models/UserModel';
import styles from '../styles/Table.module.css';

const Users = ({ userData }: { userData: UserModel[] }) => {
  return (
    <section>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user: UserModel) => (
            <tr key={user.id}>
              <td> {user.name}</td> <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Users;

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = `https://jsonplaceholder.typicode.com/users`;
  const response = await axios.get<UserModel[]>(apiUrl);
  const userData = response.data;

  return { props: { userData } };
};
