import { NEWS_API_KEY } from '@env';
import axios from 'axios';

const apiKey = NEWS_API_KEY;
console.log(apiKey);

// Função para obter as notícias mais populares pelo nome
async function getTopNewsByName(currentSearch: string) {
    const options = {
      method: 'GET',
      url: 'https://newsapi.org/v2/everything',
      params: {
        q: currentSearch,
        sortBy: 'popularity',
        apiKey,
      },
    };
  
    try {
      const response = await axios(options);
      return response.data.articles;
    } catch (error) {
      console.error('Erro ao buscar notícias pelo nome:', error);
      return [];
    }
  }

// Função para obter as notícias mais populares	
async function getTopNews() {
    const options = {
      method: 'GET',
      url: 'https://newsapi.org/v2/everything',
      params: {
        sortBy: 'popularity',
        apiKey,
      },
    };
  
    try {
      const response = await axios(options);
      return response.data.articles;
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
      return [];
    }
}

export const newsServer = { getTopNews, getTopNewsByName };