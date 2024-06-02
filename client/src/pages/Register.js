import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const users = [];
  const [usernameExists, setUsernameExists] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const bcrypt = require('bcryptjs');
  const { type } = useParams();
  const [categories, setCategories] = useState([]);

  function showAlert(title,icon) {
    Swal.fire({
      title: title,
      icon: icon,
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/Login');
      }
    });
  }


  useEffect(() => {
    axios.get('http://localhost:4000/categories/showcategories').then(
      (res) => setCategories(res.data)
    )
  }, []);

  useEffect(() => {
    axios.get(' http://localhost:4000/users').then(
      (res) => {
        res.data.forEach((element) => {
          users.push(element.username)
        })
      }
    )
  })
  function handleUsername(value) {
    setUsername(value);
    if(users.includes(value))
      setUsernameExists(true);
    else
    setUsernameExists(false);
    
  }

  function handleRegister(e) {
    e.preventDefault();
    if(usernameExists)
    {
      const usernameInput = document.getElementById('username');
      usernameInput.focus();
      return;
    }
    const user = {
      username: username,
      password: password,
      category: category
    };
    axios.post('http://localhost:4000/users/register', user).then
      (
        (res) => console.log(res)
      ).then(
        ()=>showAlert('You Have Registered Succesfully !. Please Login ','success')
      )

  }


  return (
    <div className='parent ' style={{ display: 'flex',height:'100%', backgroundColor:'#fbf9f9', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <div className='child' style={{ height: '100%', width: '30%', boxShadow: '1px 2px 9px #5f8981', borderRadius: '10px', margin: '100px', backgroundColor:'#CDE8E5' }}>
        <form className='form' onSubmit={handleRegister} style={{ marginTop: '40px' }}>
          <div className='form-group text-center' style={{ margin: '10px', fontWeight: 'bold', fontSize: '50px', fontFamily: 'arail', color: 'black' }}>
            <label>REGISTER</label><br></br>
          </div>
          <div className='form-group' style={{ margin: '10px' }}>
            <label>Enter username</label>
            <input id='username' required style={{ boxShadow: '1px 2px 9px #aaf4e5', borderRadius: '20px', border: "1px solid yellow" }} className='form-control' type='text' onChange={(e) => handleUsername(e.target.value)}></input>
            {usernameExists && (<span style={{ fontSize: '14px', color: 'red' }}>Username Already Exists!</span>)}
          </div><br></br>
          <div className='form-group' style={{ margin: '10px' }}>
            <label>Enter Password</label>
            <input required style={{ boxShadow: '1px 2px 9px #aaf4e5', borderRadius: '20px', border: "1px solid yellow" }} className='form-control' type='text' onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          {
            type == 'seller' && (<div className='form-group' style={{ margin: '10px' }}> <br></br>
              <label>category of Product</label>
              <select style={{ boxShadow: '1px 2px 9px #aaf4e5', borderRadius: '20px', border: "1px solid yellow" }} className='form-control' onChange={(e) => setCategory(e.target.value)}>
                <option>Choose</option>
                {
                  categories.map((category) => {
                    return <option>{category.name}</option>
                  })
                }
              </select>
            </div>)
          }
          <br></br>

          <div className='text-center form-group' style={{ margin: '10px 70px' }} >
            <input type='submit' className='form-control submit-btn ' ></input>
          </div>
        </form>
        <br></br>
      <br></br>
      <br></br>
      <br></br> 
      </div>

    
    </div>

  )
}

export default Register;
