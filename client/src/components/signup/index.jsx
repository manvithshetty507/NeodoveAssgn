import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/RegisterPage.module.css';
import { useNavigate } from 'react-router';

const RegisterPage = ({setIsLogin}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', { username, email, password });
      setMessage('Registration successful!');
      console.log(res);
      if(window) {
        window.localStorage.setItem("usertoken",JSON.stringify({token:res.data.token,user:username,email}));
      }
      // Redirect to login page or another page
      navigate('/dashboard');
    } catch (err) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Register</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Register</button>
        {message && <p className={styles.message}>{message}</p>}

        <p onClick={() => setIsLogin(true)} style={{padding:"10px", cursor:"pointer"}}>Already a user? Login</p>
      </form>
    </div>
  );
};

export default RegisterPage;
