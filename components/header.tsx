import React, { useState } from 'react';
import Drawer from './drawer';
import Navbar from './navbar';

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  /**
   * Used to handle the visibility of drawer
   */
  const handleToggle = (): void => {
    setToggle((prevState) => !prevState);
  };

  return (
    <>
      <header>
        <Navbar handleToggle={handleToggle} />
        <Drawer toggle={toggle} handleToggle={handleToggle} />
      </header>
    </>
  );
};

export default Header;
