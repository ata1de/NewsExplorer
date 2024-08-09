import axios from 'axios';

const apiKey = process.env.EXPO_PUBLIC_NEWS_API_KEY;
console.log(apiKey);

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

export type ResponseByName = {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type ArticleCarousel = Pick<Article, 'urlToImage' | 'title' | 'author'>;

// Função para obter as notícias mais populares pelo nome
async function getTopNewsByName(currentSearch: string): Promise<ResponseByName> {
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
      const filteredArticles = response.data.articles.filter((article: Article) => article.urlToImage);
      return {
        status: response.data.status,
        totalResults: filteredArticles.length,
        articles: filteredArticles,
      };
    } catch (error) {
      console.error('Erro ao buscar notícias pelo nome:', error);
      return { status: 'error', totalResults: 0, articles: [] };
    }
  }

// Função para obter as notícias mais populares	
async function getTopNews(q='technology'): Promise<Article[]> {
  const options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/everything',
    params: {
      q,
      sortBy: 'popularity',
      pageSize: 100,
      page: 1,
      apiKey,
    },
  };

  try {
    const response = await axios(options);
    return response.data.articles
    .filter((article: Article) => article.urlToImage) as Article[];
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao buscar notícias:', error.message);
    }
    return [];
  }
}

// Função para obter as noticias mais populares e somente as imagens
async function getTopNewsCarousel(): Promise<ArticleCarousel[]> {
  const now = new Date();
  const options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/everything',
    params: {
      q: 'technology',
      sortBy: 'relevancy',
      pageSize: 10,
      page: 1,
      apiKey,
    },
  };

  try {
    const response = await axios(options);
    return response.data.articles
    .filter((article: Article) => (article.urlToImage)) // Filtra as notícias que não possuem imagem
    .map((article: Article) => ({
      urlToImage: article.urlToImage,
      title: article.title,
      author: article.author
    })) as ArticleCarousel[];
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao buscar as notícias para o carousel:', error.message);
    }
    return [];
  }
}

async function getArticleByName(name: string): Promise<Article> {
  const options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/everything',
    params: {
      q: name,
      sortBy: 'popularity',
      apiKey,
    },
  };

  try {
    const response = await axios(options);
    return response.data.articles[0] as Article;
  } catch (error) {
    console.error('Erro ao buscar notícia pelo nome:', error);
    return {} as Article;
  }
}

export const newsServer = { getTopNews, getTopNewsByName, getTopNewsCarousel, getArticleByName };