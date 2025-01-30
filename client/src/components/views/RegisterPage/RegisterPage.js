import React,{useState}  from 'react'
import { useDispatch } from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    //const [buttonType, setButtonType] = useState("submit"); // 기본값: "submit"

    const onEmailHandler = (event) =>{
      setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) =>{
      setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
      setPassword(event.currentTarget.value)
    }
  
    const onConfirmPasswordHandler = (event) =>{
      setConfirmPassword(event.currentTarget.value)
    }

     const onSubmitHandler = (event) =>{
        event.preventDefault();
        //console.log('Email',Email)
        //console.log('Password',Password)

        if(Password !==ConfirmPassword){
          return alert("비밀번호는 같아야 합니다!");
        }

        let body = {
          email: Email,
          name:Name,
          password: Password
        }
    
        dispatch(registerUser(body))
        .then(response=>{
          // console.log('Response:', response);  // response 전체 출력
          // console.log('Response data', response.data); 
          // console.log('Response Payload:', response.payload);  // payload만 출력
          // console.log('Response Success:', response.success);  // payload만 출력
          
          if(response.success){
            //props.history.push('/login') // React Router v6 이상에서 history가 더 이상 props로 전달되지 않기 때문입니다.
            navigate('/login');
          }else{
            alert("회원가입 실패했습니다.")
          }
        }) 
        .catch((error) => {
          console.error(error);
          alert('An error occurred during login.');
    
        });
    
      }
      

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center'
      ,width:'100xh', height:'100vh'
    }}>
      <form style={{ display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <Input type="email" value={Email} onChange={onEmailHandler}></Input>
        
        <label>Name</label>
        <Input type="text" value={Name} onChange={onNameHandler}></Input>

        <label>Password</label>
        <Input type="password" value={Password} onChange={onPasswordHandler}></Input>
        
        <label>ConfirmPassword</label>
        <Input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}></Input>
        
        <br/>
        <Button type="primary" htmlType='submit'>회원가입</Button>
      </form> 

      <div style={{position:'absolute', top:'70%', right:'50%'}}>
        <a href='/' style={{marginRight:'20px'}}>돌아가기</a>
      </div>
    </div>
  )
}

export default RegisterPage