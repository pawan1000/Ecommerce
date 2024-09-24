import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
import Swal from 'sweetalert2'
import TestComponent from './testComponent'
import Footer from '../helpers/Footer'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/reducers/userReducer'
const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  //const { authState, setAuthState } = useContext(AuthContext); // used for context-api
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function showAlert(title, icon) {
    Swal.fire({
      title: title,
      icon: icon,
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  }


  function handleLogin(e) {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    };
    axios.post(`${apiUrl}/users/login`, data).then(
      (res) => {
        if (res.data.message) {

          sessionStorage.setItem('accessToken', res.data.accessToken);
          //  setAuthState({ userType: res.data.userType, status: true, username: res.data.username, user_id: res.data.user_id });//used with context-api
          dispatch(setUser({ userType: res.data.userType, status: true, username: res.data.username, user_id: res.data.user_id }));//using redux
          showAlert('You Logged in Succesfulyy', 'success');
          return 'home'
        }
        else {
          showAlert('Login Failed', 'error')

        }
      }
    ).then(
      (page) => {

      }
    )
  }

  return (
    <>
      <div className='parent ' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div className='child' style={{ height: '500px', width: '500px', boxShadow: '1px 2px 9px #5f8981', borderRadius: '10px', margin: '100px', backgroundColor: '#CDE8E5' }}>
          <form className='form' onSubmit={handleLogin} style={{ marginTop: '40px' }}>
            <div className='form-group text-center' style={{ margin: '10px', fontWeight: 'bold', fontSize: '50px', fontFamily: 'arail', color: 'black' }}>
              <label>LOGIN</label><br></br>
            </div>
            <div className='form-group' style={{ margin: '10px' }}>
              <label>Enter username</label><br></br>
              <input required type='text' style={{ boxShadow: '1px 2px 9px #aaf4e5', borderRadius: '20px', border: "1px solid yellow" }} className='form-control' onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <br></br>
            <div className='form-group' style={{ margin: '10px' }}>
              <label>Enter Password</label><br></br>
              <input required type='password' style={{ boxShadow: '1px 2px 9px #aaf4e5', borderRadius: '20px', border: "1px solid yellow" }} className='form-control' onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <br></br>
            <br></br>
            <div className='form-group' style={{ margin: '10px 70px' }} >
              <input type='submit' className='form-control btn-login submit-btn'  ></input>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Login;
