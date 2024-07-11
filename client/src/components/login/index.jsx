import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/LoginPageStyles.module.css'
import { useNavigate } from 'react-router';

const LoginPage = ({setIsLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      
      if(window) {
        window.localStorage.setItem("usertoken",JSON.stringify({token:res.data.token,user:res.data.user,email:res.data.email}));
      }
      setMessage('Login successful!');
      navigate('/dashboard')
      // Redirect to homepage or another page
    } catch (err) {
      console.log(err)
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
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
        <button type="submit" className={styles.button}>Login</button>
        {message && <p className={styles.message}>{message}</p>}

        <p onClick={() => setIsLogin(false)} style={{padding:"10px", cursor:"pointer"}}>New user? signUp</p>
      </form>
    </div>
  );
};

export default LoginPage;
