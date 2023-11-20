import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import "./Register.css"
import Nav from './Nav';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    userPassword: '',
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  // const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecaptcha = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      alert('Please complete the reCAPTCHA');
      return;
    }

    const newUser = {
      userName: user.userName,
      userPassword: user.userPassword,
    };

    // Include the 'g-recaptcha-response' parameter in the POST request
    axios
      .post('/users/adduser', newUser, {
        params: {
          'g-recaptcha-response': recaptchaValue,
        },
      })
      .then((response) => {
        console.log('User added:', response.data);
        alert('User added successfully');
        setUser({
          userName: '',
          userPassword: '',
        });
        setRecaptchaValue(null);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          alert('User already exists');
        } else {
          console.error('Error adding user:', error);
          alert('Failed to add user');
        }
      });
      navigate("/login");
      
  };

  return (
    <div>
        <Nav />
      <center><h2>Add User</h2></center>
      <form onSubmit={handleSubmit}>
        <div className='box'>
        <div>
          <label htmlFor="userName"></label>
          <input className='input'
            type="text"
            id="userName"
            name="userName"
            placeholder='UserName'
            value={user.userName}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="userPassword"></label>
          <input className='input'
            type="password"
            id="userPassword"
            name="userPassword"
            placeholder='Password'
            value={user.userPassword}
            onChange={handleChange}
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
        {/* <div className="g-recaptcha" data-type="image" data-sitekey="6Lc3xNIoAAAAAEpOiFtwUjuN7uRfzD-kYea7GAGe" onChange={handleRecaptcha} ></div> */}

        <button className='button' type="submit">Add User</button>
        <div>already a member?<Link to="/login">login</Link></div>
      </form>
    </div>
  );
}

export default Register;


