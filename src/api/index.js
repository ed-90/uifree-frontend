import axios from 'axios';

const API = axios.create({
    baseURL: 'https://uifree.ru/api',
});

export const getComponents = async (category = 'all', page = 1) => {
  try {
    const response = await API.get('/components', {
      params: { category, page, limit: 20 }
    });
    return response.data.components || [];  // возвращаем массив
  } catch (error) {
    console.error('Ошибка загрузки компонентов:', error);
    return [];
  }
};

export const getComponentById = async (id) => {
    try {
        const response = await API.get(`/components/${id}`);
        return response.data; // API возвращает сам объект компонента
    } catch (error) {
        console.error('Ошибка загрузки компонента:', error);
        return null;
    }
};

export const getCategories = async () => {
    try {
        const response = await API.get('/components/categories/list');
        return response.data;
    } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
        return ['buttons', 'cards', 'inputs', 'loaders', 'checkboxes'];
    }
};

export const getComponentsCount = async () => {
    try {
        const response = await API.get('/components/count');
        return response.data.count;
    } catch (error) {
        console.error('Ошибка загрузки количества компонентов:', error);
        return 0;
    }
};