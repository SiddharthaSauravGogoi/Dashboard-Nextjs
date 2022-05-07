import React from 'react';
import Header from './header';
import styles from '../styles/Home.module.css';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
