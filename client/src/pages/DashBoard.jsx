import React, { useEffect, useState } from 'react';
import styles from '../styles/dashboardStyles.module.css';

import io from 'socket.io-client';
import { useNavigate } from 'react-router';
import axios from 'axios';
const socket = io.connect("http://localhost:3000/");

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const[userEmail, setUserEmail] = useState('');
  const[userName, setUserName] = useState('');
  const navigate = useNavigate();

  const fetchUserData = async () => {
    if(window) {
      const data = JSON.parse(window.localStorage.getItem("usertoken"));
      setUserName(data.user);
      setUserEmail(data.email);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("usertoken");
    navigate("/");
  }

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const userFromLocal = JSON.parse(window.localStorage.getItem('usertoken'));
        console.log(userFromLocal);

        if (userFromLocal && userFromLocal.token) {
          const res = await axios.post('http://localhost:3000/api/auth/verify-token', {
            token: userFromLocal.token,
            user: userFromLocal.user
          });

          console.log('Token verified:', res.data);

          if (!res.data?.isAuthenticated) {
            window.localStorage.removeItem("usertoken");
            navigate("/");
          }else {
            fetchUserData();
            return;
          }
        } else {
          console.log('No valid token found');
          navigate("/");
        }
      } catch (err) {
        console.error('Token verification error:', err);
        navigate("/");
      }
    };

    verifyToken();
  }, [navigate]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('chat_history', (history) => {
      console.log("history", history);
      setMessages(history);
    });

    socket.on('received_msg', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('connect');
      socket.off('chat_history');
      socket.off('received_msg');
      socket.off('disconnect');
      socket.off('connect_error');
    };
  }, []);

  console.log("dashboard")

  const sendMessage = () => {
    if (message) {
      const msgObj = {
        email: userEmail,
        username: userName,
        msg: message,
        timestamp: new Date().toISOString()
      };

      socket.emit('send_message', msgObj);
      setMessages(prevMessages => [...prevMessages,msgObj]);
      setMessage('');
    }
  };

  return (
    <div className={styles.chatContainer}> 
      <div className={styles.header}>
        <h1>Chat</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
      <div className={styles.messagesContainer}> 
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${styles.message} ${msg.email === userEmail ? styles.myMessage : styles.otherMessage}`} 
        >
          <span className={styles.messageUsername}><strong>@{msg.username}</strong></span>
          <span className={styles.messageContent}>{msg.msg}</span> 
          <span className={styles.messageTimestamp}><em>{new Date(msg.timestamp).toLocaleTimeString()}</em></span>
        </div>
      ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className={styles.messageInput}
      />
      <button onClick={sendMessage} className={styles.sendButton}>Send</button>
    </div>
  );
};

export default ChatPage;