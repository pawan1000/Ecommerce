import Home from './pages/Home';
import Register from './pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from '../src/pages/Login';
import Product from './pages/Product';
import Carts from '../src/pages/Carts';
import { AuthContext } from './helpers/AuthContext';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Navbar from './pages/Navbar';
import Payment from './pages/Payment';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/reducers/userReducer';

function App() {

  // const [authState, setAuthState] = useState({ username: '', status: false, userType: 'buyer', user_id: null })  //Used with context-api
  // const [cartCount, setCartCount] = useState(0);   //Used with context-api
  const [animate, setAnimate] = useState(false); // State to manage animation
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios.get('http://localhost:4000/users/auth', { headers: { accessToken: sessionStorage.getItem('accessToken') } }).then(
      (res) => {
        console.log(res);
        if (res.data.error) {
          // setAuthState({ ...authState, status: false })
        }
        else {
          // setAuthState({ username: res.data.username, status: true, userType: res.data.userType, user_id: res.data.user_id })
          dispatch(setUser({ username: res.data.username, status: true, userType: res.data.userType, user_id: res.data.user_id }));
        }
      }
    )
  }, [])



  return (
    <div className={`App ${animate ? 'fade-in' : ''}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/Register' exact element={<Register />} />
          <Route path='/Register/:type' exact element={<Register />} />
          <Route path='/Login' exact element={<Login />} />
          <Route path='/product/:id' exact element={<Product />} />
          <Route path='/Carts' exact element={<Carts />} />
          <Route path='/Dashboard' exact element={<Dashboard />} />
          <Route path='/Categories/:name' exact element={<Categories />} />
          <Route path='/payment/:cartId' exact element={<Payment />} />
          <Route path='/payment' exact element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
