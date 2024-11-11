import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортируем createRoot
import './index.css';  // Общие стили
import App from './App'; // Основной компонент приложения

// Создаем корневой элемент с помощью createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение в корневой элемент
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
