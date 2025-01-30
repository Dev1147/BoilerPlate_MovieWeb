import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';

function LoginPage(props) {  
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) =>{
    event.preventDefault();
    //console.log('Email',Email)
    //console.log('Password',Password)

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
    .then(response=>{
      //console.log('Response:', response);  // response 전체 출력
      //console.log('Response data', response.data); 
      //console.log('Response Payload:', response.payload);  // payload만 출력
      //console.log('Response loginSuccess:', response.loginSuccess); 

      if(response.loginSuccess){
        //props.history.push('/') // React Router v6 이상에서 history가 더 이상 props로 전달되지 않기 때문입니다.
        localStorage.setItem('userId', response.userId);// 로컬스토리지에 저장
        navigate('/');
      }else{
        alert("아이디또는 비밀번호가 틀렸습니다.")
      }
    }) 
    .catch((error) => {
      console.error(error);
      alert('An error occurred during login.');

    });

  }

  const onRegisterHandler = () => {
    navigate('/register');
  }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center'
      ,width:'100xh', height:'100vh'
    }}>
      <form style={{display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <Input type="email" value={Email} onChange={onEmailHandler}></Input>
        <label>Password</label>
        <Input type="password" value={Password} onChange={onPasswordHandler}></Input>
        <br/>
        
        <Button type="primary" htmlType='submit'>Login</Button>
      </form> 
      
      <div style={{position:'absolute', top:'65%', right:'44%'}}>
        <a href='/' style={{marginRight:'20px'}}>돌아가기</a>
        <Button  type="primary" onClick={onRegisterHandler}>Register</Button>
        <br/>
        <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
      </div>
    

      
    </div>
    
  )
}

export default LoginPage