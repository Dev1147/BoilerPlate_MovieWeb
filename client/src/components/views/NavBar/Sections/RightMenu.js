import React,{ useState, useEffect } from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useNavigate,Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {logoutUser} from '../../../../_actions/user_action'


function RightMenu(props) {
  const userLoginState = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(userLoginState.loginSuccess);
  // console.log('isLoggedIn',isLoggedIn)
  //console.log('loginSuccess',userLoginState.loginSuccess)
  // console.log('userLoginState',userLoginState)

  useEffect(() => {
    //console.log(isLoggedIn); 
    setIsLoggedIn(userLoginState.loginSuccess);
    //console.log(isLoggedIn); 
  }, [userLoginState.loginSuccess]);

  const logoutHandler = (event) => {//axios.get(`${USER_SERVER}/logout`)
    event.preventDefault();
    localStorage.removeItem("userId"); 
    
    dispatch(logoutUser())
      .then(response => {
      //  console.log('response:',response); 
      //  console.log('response.success:',response.success);
        if (response.success) {
          setIsLoggedIn(false)
          navigate("/login");
        } else {
          alert('로그아웃 실패 했습니다.')
        }
      })
      // .catch(error => {
      //   console.error('Logout error:', error);
      //   alert('로그아웃 요청 중 문제가 발생했습니다.');
      // });


  };

  if (!isLoggedIn) {   // 로그인하지 않은 경우userLoginState.userData && !userLoginState.userData.isAuth
    //console.log(userLoginState.loginSuccess.loginSuccess)
    //console.log(userLoginState.userData.isAuth)
    return (
      <Menu mode={props.mode} 
        items={[
          { 
            key: 'mail', 
            label: <a href="/login">Signin</a> 
          },
          { 
            key: 'app', 
            label: <a href="/register">Signup</a> 
          }
        ]} 
      />
    )
  } else {   // 로그인한 경우
    return (
      <Menu mode={props.mode} 
        items={[
          { 
            key: 'logout', 
            label: <a onClick={logoutHandler}>Logout</a> 
          }
        ]} 
      />
    )
  }
}

export default RightMenu;