import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from 'axios';
import './SubscriptionPage.css';
import { useLocation } from 'react-router-dom';

const categoriesData = [
    {
        name: 'Мобильные и аксессуары',
        subcategories: [
            'Мобильные телефоны',
            'Power bank',
            'Наушники',
            'Смарт часы и фитнес браслеты',
            'Пульсометры и шагомеры',
        ],
    },
    {
        name: 'Ноутбуки и аксессуары',
        subcategories: [
            'Ноутбуки',
            'Подставки для ноутбуков',
            'Аккумуляторы для ноутбуков',
            'Сумки для ноутбуков',
            'Рюкзаки',
        ],
    },
    {
        name: 'Мониторы',
        subcategories: [
            '23 – 24"',
            '25 – 26"',
            '27 – 28"',
            '29 – 30"',
            '31 – 32"',
            '33 – 34"',
        ],
    },
    {
        name: 'ПК',
        subcategories: [
            'мини ПК',
            'настольный',
            'игровой',
        ],
    },
    {
        name: 'Комплектующие',
        subcategories: [
            'Материнские платы',
            'Оперативная память',
            'Блоки питания',
            'Корпуса',
            'Процессоры',
            'Системы охлаждения',
            'Видеокарты',
            'SSD-накопители',
            'Жесткие диски',
        ],
    },
    {
        name: 'Планшеты и аксессуары',
        subcategories: [
            'Планшеты',
            'Портативные колонки',
            'Клавиатуры',
            'Стилусы',
        ],
    },
    {
        name: 'Электронные книги',
        subcategories: [
            'Электронные книги',
            'Карты памяти',
        ],
    },
];

function SubscriptionPage() {
  const location = useLocation();
  const user = location.state ? location.state.user : null;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { username } = user;

  useEffect(() => {
    if (user && user.selected_categories) {
      setSelectedCategories(user.selected_categories);
    }
  }, [user]);

  if (!user) {
    return <div>No user data found.</div>;
  }

  const handleCategoryChange = (subcategory) => {
    if (selectedCategories.includes(subcategory)) {
      setSelectedCategories(selectedCategories.filter((sel) => sel !== subcategory));
    } else {
      setSelectedCategories([...selectedCategories, subcategory]);
    }
  };

  const handleSave = async () => {
  const updatedUser = { ...user, selected_categories: selectedCategories };

      try {
        const response = await axios.put(`http://localhost:8000/users`, updatedUser);
        console.log('User updated successfully:', response.data);
      }
      catch (error) {
        console.error('Error: ', error);
      }
  };

  return (
    <div>
      <h3>{`Здравствуйте, ${username}!`}</h3>
      <h1>Выберите категории:</h1>
      <div className="category-container">
        {categoriesData.map((category) => (
          <div key={category.name} className="category">
            <h3>{category.name}</h3>
            {category.subcategories.map((subcategory) => (
              <div key={subcategory}>
                <Checkbox
                  checked={selectedCategories.includes(subcategory)}
                  onChange={() => handleCategoryChange(subcategory)}
                />
                {subcategory}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="save-container">
        <Button variant="contained" color="primary" onClick={handleSave}>
          СОХРАНИТЬ
        </Button>
      </div>
    </div>
  );
}

export default SubscriptionPage;