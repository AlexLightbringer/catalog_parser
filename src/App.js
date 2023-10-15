import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import SubscriptionPage from './SubscriptionPage';

function App() {
  return (
    <div className="wrapper">
      <h1>Сервис по отслеживанию снижения цен</h1>
      <p>Добро пожаловать на наш ресурс для тех, кто хочет делать покупки с умом!</p>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
