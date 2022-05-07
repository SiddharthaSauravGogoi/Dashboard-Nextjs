import React from 'react';
import Link from 'next/link';
import styles from '../styles/Nav.module.css';

type Props = {
  toggle: boolean;
  handleToggle: React.MouseEventHandler<HTMLButtonElement>;
};

const Drawer = (props: Props) => {
  return (
    <ul
      className={
        !props.toggle
          ? `${styles.drawer}`
          : `${styles.drawer}  ${styles.showMenu}`
      }
    >
      <li>
        <button onClick={props.handleToggle}>&#10060;</button>
      </li>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/news">News</Link>
      </li>
      <li>
        <Link href="#!">Log out</Link>
      </li>
    </ul>
  );
};

export default Drawer;
