import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import UserModel from '../models/UserModel';
import UserTable from '../components/Users/usertable';

const Users = ({ userData }: { userData: UserModel[] }) => {
  const [query, setQuery] = React.useState<string>('');
  return (
    <section>
      <label htmlFor="search">
        <input
          type="text"
          placeholder="search"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <UserTable query={query} userData={userData} />
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
