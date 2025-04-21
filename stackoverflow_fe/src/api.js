import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;
const SITE = process.env.REACT_APP_SITE;
const CACHE_EXPIRATION = parseInt(process.env.REACT_APP_CACHE_EXPIRATION, 10) || 720 * 60 * 1000; // Cache expiry time: 120 minutes


const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    site: SITE,
  },
});

// Function to get data from cache
const getCache = (key) => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const { timestamp, data } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      return data;
    } else {
      localStorage.removeItem(key); // Remove expired cache
    }
  }
  return null;
};

// Function to set data in cache
const setCache = (key, data) => {
  localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
};

export const fetchQuestions = async (params) => {
  const cacheKey = `questions_${JSON.stringify(params)}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  const response = await api.get('/questions', { params });
  setCache(cacheKey, response.data.items);
  return response.data.items;
};

export const fetchQuestionById = async (id) => {
  const cacheKey = `question_${id}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  const response = await api.get(`/questions/${id}`, { params: { filter: 'withbody' } });
  setCache(cacheKey, response.data.items[0]);
  return response.data.items[0];
};

export const fetchTags = async () => {
  const cacheKey = 'tags';
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  const response = await api.get('/tags');
  setCache(cacheKey, response.data.items);
  return response.data.items;
};

export const fetchCollectives = async () => {
  const cacheKey = 'collectives';
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  const response = await api.get('/collectives');
  setCache(cacheKey, response.data.items);
  return response.data.items;
};

export const fetchRelatedTags = async () => {
  const cacheKey = 'related_tags';
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  const response = await api.get('/tags?order=desc&sort=popular');
  setCache(cacheKey, response.data.items);
  return response.data.items;
};

export const fetchHotNetworkQuestions = async () => {
  const cacheKey = 'hot_network_questions';
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  const response = await api.get('/questions?order=desc&sort=hot');
  setCache(cacheKey, response.data.items);
  return response.data.items;
};

export const fetchUsers = async () => {
  const cacheKey = 'users';
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  const response = await api.get('/users?order=desc&sort=reputation');
  setCache(cacheKey, response.data.items);
  return response.data.items;
};

export const searchQuestions = async (query) => {
  const cacheKey = `search_${query}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  const response = await api.get('/search', {
    params: {
      intitle: query,
    },
  });

  setCache(cacheKey, response.data.items);
  return response.data.items;
};

export const createQuestion = async ({ title, body, tags, accessToken, key }) => {
  const response = await axios.post(`${API_BASE_URL}/questions/add`, null, {
    params: {
      key,
      access_token: accessToken,
      site: SITE,
      title,
      body,
      tags: tags.join(',')
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const upvoteQuestion = async (questionId, accessToken, key) => {
  const response = await axios.post(`${API_BASE_URL}/questions/${questionId}/upvote`, null, {
    params: {
      access_token: accessToken,
      key,
      site: SITE,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const downvoteQuestion = async (questionId, accessToken, key) => {
  const response = await axios.post(`${API_BASE_URL}/questions/${questionId}/downvote`, null, {
    params: {
      access_token: accessToken,
      key,
      site: SITE,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const fetchCommentsOnQuestion = async (questionId) => {
  const cacheKey = `comments_${questionId}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  const response = await api.get(`/questions/${questionId}/comments`);
  setCache(cacheKey, response.data.items);
  return response.data.items;
};

export const postCommentToQuestion1 = async (questionId, commentText, accessToken, preview = false) => {
  try {
    const response = await api.post(
      `/posts/${questionId}/comments/add`,
      null,
      {
        params: {
          body: commentText,
          key: process.env.REACT_APP_STACKEXCHANGE_KEY,
          access_token: accessToken || localStorage.getItem('stack_token'),
          preview: preview,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error posting comment:', error);
    return null;
  }
};

export const postCommentToQuestion = async (questionId, body, accessToken, preview = false) => {
  const url = `/posts/${questionId}/comments/add`;

  const formData = new URLSearchParams();
  formData.append('body', body);
  formData.append('site', SITE);
  if (preview) formData.append('preview', 'true');

  // Use token from parameter or fallback to localStorage
  const token = accessToken || localStorage.getItem('stack_token');
  if (!token) throw new Error("Access token is required to post a comment.");

  formData.append('access_token', token);

  // ✅ Required if access_token is used
  const appKey = process.env.REACT_APP_STACK_APP_KEY;
  if (!appKey) throw new Error("Stack App Key is missing from environment variables.");
  formData.append('key', appKey);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await api.post(url, formData.toString(), { headers });
  return response.data;
};
