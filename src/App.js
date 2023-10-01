import React from 'react';
import SubscriptionPage from "./SubscriptionPage";


function App() {
  return (
    <div className="wrapper">
      <h1>Сервис по отслеживанию снижения цен</h1>
        <p>Добро пожаловать на наш ресурс для тех, кто хочет делать покупки с умом!
            Для оформления подписки выберите интересующие категории и подкатегории.
            Вы можете выбрать как всю категорию, так и гибко настроить только интересующие Вас разделы!
        </p>
        <SubscriptionPage/>
    </div>
  );
}

export default App;
