import React from 'react';
import styles from '../styles/Nav.module.css';
import Link from 'next/link';

type Props = {
  handleToggle: React.MouseEventHandler<HTMLButtonElement>;
};

const Navbar = (props: Props) => {
  return (
    <nav className={styles.nav}>
      <button onClick={props.handleToggle}>
        <div></div>
        <div></div>
        <div></div>
      </button>
      <ul>
        <Link href="/users"> Users</Link>
        <Link href="/news"> News </Link>
        <Link href="/top_users"> Top Users </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
