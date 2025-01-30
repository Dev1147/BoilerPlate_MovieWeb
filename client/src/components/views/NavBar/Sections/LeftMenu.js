import React, { createRef } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'; 
function LeftMenu(props) {
  const items = [
    { 
      key: 'home', 
      label: <Link to="/">Home</Link>, 
    },
    { 
      key: 'favorite', 
    
      label: <Link to="/favorite">Favorite</Link>, 
    },
    { 
      key: 'app', 
      label: 'Menu', 
      children: [
        { 
          key: 'sub1', 
          label: 'Option 1', 
          disabled: true, 
          children: [ 
            { key: 'setting:1', label: 'Option 1' }, 
            { key: 'setting:2', label: 'Option 2' }, 
          ], 
        },
        { 
          key: 'sub2', 
          label: 'Option 2', 
          children: [ 
            { key: 'setting:3', label: 'Option 3' }, 
            { key: 'setting:4', label: 'Option 4' }, 
          ], 
        },
      ], 
    },
  ]

  return (
    // <Menu mode={props.mode}>
    //   <Menu.Item key="mail">
    //     <a href="/">Home</a>
    //   </Menu.Item>
    //   <Menu.SubMenu key="sub1" title="Blogs"> 
    //     <Menu.ItemGroup key="g1" title="Item 1">
    //       <Menu.Item key="setting:1">Option 1</Menu.Item>
    //       <Menu.Item key="setting:2">Option 2</Menu.Item>
    //     </Menu.ItemGroup>
    //     <Menu.ItemGroup key="g2" title="Item 2">
    //       <Menu.Item key="setting:3">Option 3</Menu.Item>
    //       <Menu.Item key="setting:4">Option 4</Menu.Item>
    //     </Menu.ItemGroup>
    //   </Menu.SubMenu>
    // </Menu>

    //<Menu mode='horizontal' items={items} />
    <Menu mode={props.mode} style={{alignItems:'center'}}
      items={items} 
    />
  );
}

export default LeftMenu;