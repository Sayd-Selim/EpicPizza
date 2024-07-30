// useStates.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

let currentHook = 0;
let hooks = [];
let root = ReactDOM.createRoot(document.getElementById('root'));

function useStates(initialValue) {
  // Инициализируем хук, если это первый вызов
  if (!hooks[currentHook]) {
    hooks[currentHook] = initialValue;
  }

  const setStateHookIndex = currentHook;

  const setState = (newValue) => {
    hooks[setStateHookIndex] = newValue;
    render(); // Перерисовываем компонент
  };

  // Возвращаем текущее состояние и функцию для его обновления
  return [hooks[currentHook++], setState];
}

// Обновленный метод render, который перерисовывает приложение
function render() {
  currentHook = 0;
  root.render(<App />);
}

export default useStates;
