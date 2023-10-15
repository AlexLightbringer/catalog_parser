import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import SubscriptionPage from './SubscriptionPage';

function RegistrationPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [registered, setRegistered] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRegistration = async () => {
  try {
    const userCategories = { ...userData, selected_categories: [] };
    const response = await axios.post('http://localhost:8000/users', userCategories);
    if (response.status === 200) {
      setRegistered(true);
      navigate('/subscription', { state: { user: userCategories } });
    }
  }
  catch (error) {
    console.error('Error: ', error);
  }
  };

  return (
    <div>
      {registered ? (
        <SubscriptionPage location={{ state: { user: userData } }} />
      ) : (
        <div>
          <h1>Зарегистрируйтесь для получения уведомлений:</h1>
          <TextField
            name="username"
            label="Никнейм"
            value={userData.username}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Почта"
            value={userData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Пароль"
            value={userData.password}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegistration}
          >Зарегистрироваться</Button>
        </div>
      )}
    </div>
  );
}

export default RegistrationPage;