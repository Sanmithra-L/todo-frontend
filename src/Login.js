
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import Nav from './Nav';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({
    userName: '',
    userPassword: '',
  });
  const [loginStatus, setLoginStatus] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState('');
  const { setAuthToken } = useAuth();
  const { setIsAuthenticated } = useAuth(); // Destructure both functions from useAuth

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRecaptcha = (value) => {
    setRecaptchaValue(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/users/login', user, {
        params: {
          'g-recaptcha-response': recaptchaValue,
        },
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setAuthToken(response.data.authToken);
        const userId = response.data.userId;
        setLoginStatus('Login Successful');
        console.log('Login successful response:', response);

        navigate(`/users/${userId}`);
      } else {
        setLoginStatus('Invalid username or password');
        console.log('Login unsuccessful response:', response);
      }
    } catch (error) {
      console.error('Login failed', error);
      setLoginStatus('Login Failed');
    }
  };

  return (
    <div>
      <Nav />
      <center>
        <h2>Login</h2>
      </center>
      <form onSubmit={handleLogin}>
        <div className='box'>
          <div>
            <label htmlFor="userName"></label>
            <input
              className="input"
              type="text"
              id="userName"
              name="userName"
              placeholder="UserName"
              value={user.userName}
              onChange={handleInputChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor='userPassword'></label>
            <input
              className="input"
              type="password"
              id="userPassword"
              name="userPassword"
              placeholder="Password"
              value={user.userPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='captcha'>
          <ReCAPTCHA
            sitekey="6Lc3xNIoAAAAAEpOiFtwUjuN7uRfzD-kYea7GAGe"
            type="image"
            onChange={handleRecaptcha}
          />
        </div>
        <button className='button' type="submit">
          Login
        </button>
        <div>Not a member? <Link to="/register">Signup</Link></div>
      </form>
      {loginStatus && <p>{loginStatus}</p>}
    </div>
  );
}

export default Login;
