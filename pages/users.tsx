import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import UserModel from '../models/UserModel';
import UserTable from '../components/Users/usertable';
import styles from '../styles/Table.module.css';

const Users = ({ userData }: { userData: UserModel[] }) => {
  const [query, setQuery] = React.useState<string>('');
  const [toggle, setToggle] = React.useState<boolean>(false);

  return (
    <section>
      <div className={styles.tableActions}>
        <label htmlFor="search">
          <input
            type="text"
            placeholder="search"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label className={styles.switch}>
          <input
            type="checkbox"
            onChange={() => setToggle((prevState) => !prevState)}
            checked={toggle}
          />
          <span className={styles.slider}></span>
        </label>
      </div>

      <UserTable query={query} userData={userData} toggle={toggle} />
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
