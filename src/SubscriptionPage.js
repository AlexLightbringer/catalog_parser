import React, {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import './SubscriptionPage.css';

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

function CategorySelect(){
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (categoryName) => {
        if (selectedCategories.includes(categoryName)){
            setSelectedCategories(selectedCategories.filter((sel) => sel !== categoryName));
        }
        else {
            setSelectedCategories([...selectedCategories, categoryName]);
        }
    };

    const handleSave = () => {
        console.log('Pass')
    }

    return(
        <div>
            <h1>Выберите категории:</h1>
            <div className="category-container">
                {
                    categoriesData.map((category) => (
                        <div key={category.name} className="category">
                            <h3>{category.name}</h3>
                            {
                                category.subcategories.map((subcategory) => (
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

export default CategorySelect;