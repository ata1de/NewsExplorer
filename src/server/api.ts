import { NEWS_API_KEY } from '@env';
import axios from 'axios';

const apiKey = NEWS_API_KEY;
// console.log(apiKey);

export type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export type ArticleCarousel = Pick<Article, 'urlToImage'>;

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
async function getTopNews(): Promise<Article[]> {
  const options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/everything',
    params: {
      q: 'technology',
      sortBy: 'popularity',
      pageSize: 10,
      page: 1,
      apiKey,
    },
  };

  try {
    const response = await axios(options);
    return response.data.articles as Article[];
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao buscar notícias:', error.message);
    }
    return [];
  }
}

// Função para obter as noticias mais populares e somente as imagens
async function getTopNewsCarousel(): Promise<ArticleCarousel[]> {
  const options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/everything',
    params: {
      q: 'technology',
      sortBy: 'relevancy',
      pageSize: 5,
      page: 1,
      apiKey,
    },
  };

  try {
    const response = await axios(options);
    return response.data.articles.map((article: Article) => ({
      urlToImage: article.urlToImage,
    })) as ArticleCarousel[];
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao buscar as notícias para o carousel:', error.message);
    }
    return [];
  }
}

export const newsServer = { getTopNews, getTopNewsByName, getTopNewsCarousel };