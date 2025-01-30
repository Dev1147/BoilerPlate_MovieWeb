import React, { useState, useRef } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; 
import './Sections/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false);
  const myRef = useRef(null); // ref 추가

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <Link to="/" style={{textDecoration:'none'}}>MovieWeb</Link>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <MenuOutlined /> 
        </Button>
        <Drawer
          title="Menu" 
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          open={visible}
        >
          <div ref={myRef}>
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </div>
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;