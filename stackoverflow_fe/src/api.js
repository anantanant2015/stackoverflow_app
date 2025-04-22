// api.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/';
const API_SUFFIX = process.env.REACT_APP_API_SUFFIX || '';
const SITE = process.env.REACT_APP_SITE || 'stackoverflow';
const CACHE_EXPIRATION = Number(process.env.REACT_APP_CACHE_EXPIRATION) || 720 * 60 * 1000;
const STACKEXCHANGE_KEY = process.env.REACT_APP_STACK_APP_KEY;

if (!STACKEXCHANGE_KEY) throw new Error("Stack App Key is missing.");

const API_BASE_URL = `${API_URL.replace(/\/+$/, '')}${API_SUFFIX.startsWith('/') ? '' : '/'}${API_SUFFIX}`;
if (process.env.NODE_ENV !== 'production') {
  console.log('API_BASE_URL:', API_BASE_URL);
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Cache helpers
const getCache = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_EXPIRATION) return data;
    localStorage.removeItem(key);
  } catch (_) {
    localStorage.removeItem(key);
  }
  return null;
};

const setCache = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
  } catch (_) {}
};

// Generic API request function
export const apiRequest = async ({ method = 'GET', path, params = {}, data = null, cacheKey = null }) => {
  const fullParams = {
    ...params,
    site: SITE,
    key: STACKEXCHANGE_KEY, // Ensure key is included
  };

  if (cacheKey) {
    const cached = getCache(cacheKey);
    if (cached) return cached;
  }

  try {
    const response = await api.request({
      url: path,
      method,
      params: fullParams,
      data,
    });

    const result = response.data.items || response.data;

    if (cacheKey) setCache(cacheKey, result);

    return result;
  } catch (error) {
    console.error(`API request error: ${error}`);
    throw error;
  }
};

// API endpoints

export const fetchQuestions = async (params) =>
  apiRequest({ method: 'GET', path: '/questions', params, cacheKey: `questions_${JSON.stringify(params)}` });

export const fetchQuestionById = async (id) =>
  apiRequest({ method: 'GET', path: `/questions/${id}`, params: { filter: 'withbody' }, cacheKey: `question_${id}` });

export const fetchTags = async () =>
  apiRequest({ method: 'GET', path: '/tags', cacheKey: 'tags' });

export const fetchCollectives = async () =>
  apiRequest({ method: 'GET', path: '/collectives', cacheKey: 'collectives' });

export const fetchRelatedTags = async () =>
  apiRequest({ method: 'GET', path: '/tags', params: { order: 'desc', sort: 'popular' }, cacheKey: 'related_tags' });

export const fetchHotNetworkQuestions = async () =>
  apiRequest({ method: 'GET', path: '/questions', params: { order: 'desc', sort: 'hot' }, cacheKey: 'hot_network_questions' });

export const fetchUsers = async () =>
  apiRequest({ method: 'GET', path: '/users', params: { order: 'desc', sort: 'reputation' }, cacheKey: 'users' });

export const searchQuestions = async (query) =>
  apiRequest({ method: 'GET', path: '/search', params: { intitle: query }, cacheKey: `search_${query}` });

export const createQuestion = async ({ title, body, tags, accessToken }) => {
  return apiRequest({
    method: 'POST',
    path: '/questions/add',
    params: {
      access_token: accessToken,
      title,
      body,
      tags: tags.join(','),
    },
  });
};

export const upvoteQuestion = async (questionId, accessToken) => {
  return apiRequest({
    method: 'POST',
    path: `/questions/${questionId}/upvote`,
    params: {
      access_token: accessToken,
    },
  });
};

export const downvoteQuestion = async (questionId, accessToken) => {
  return apiRequest({
    method: 'POST',
    path: `/questions/${questionId}/downvote`,
    params: {
      access_token: accessToken,
    },
  });
};

export const fetchCommentsOnQuestion = async (questionId) =>
  apiRequest({ method: 'GET', path: `/questions/${questionId}/comments`, cacheKey: `comments_${questionId}` });

export const postCommentToQuestion = async (questionId, body, accessToken, preview = false) => {
  const token = accessToken || localStorage.getItem('stack_token');
  if (!token) throw new Error("Access token is required to post a comment.");

  return apiRequest({
    method: 'POST',
    path: `/posts/${questionId}/comments/add`,
    params: {
      body,
      preview: preview ? 'true' : undefined,
      access_token: token,
    },
  });
};
