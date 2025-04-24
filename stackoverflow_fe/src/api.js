// api.js

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api/";
const API_SUFFIX = process.env.REACT_APP_API_SUFFIX || "";
const SITE = process.env.REACT_APP_SITE || "stackoverflow";
const CACHE_EXPIRATION =
  Number(process.env.REACT_APP_CACHE_EXPIRATION) || 720 * 60 * 1000; // default 720 min
const STACKEXCHANGE_KEY = process.env.REACT_APP_STACK_APP_KEY;

if (!STACKEXCHANGE_KEY) throw new Error("Stack App Key is missing.");

const API_BASE_URL = `${API_URL.replace(/\/+$/, "")}${API_SUFFIX.startsWith("/") ? "" : "/"}${API_SUFFIX}`;
if (process.env.NODE_ENV !== "production") {
  console.log("API_BASE_URL:", API_BASE_URL);
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

const isBackendCacheEnabled = () => {
  try {
    return localStorage.getItem("backendCacheEnabled") === "true";
  } catch {
    return false;
  }
};

const isRerankEnabled = () => {
  try {
    return localStorage.getItem("rerankEnabled") === "true";
  } catch {
    return false;
  }
};

// Cache helpers
const getCache = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_EXPIRATION) return data;
    localStorage.removeItem(key);
  } catch {
    localStorage.removeItem(key);
  }
  return null;
};

const setCache = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
  } catch (err) {
    console.error("Set cache error:", err);
  }
};

// Check if cache is enabled in localStorage
const isCacheEnabled = () => {
  try {
    return localStorage.getItem("cacheEnabled") === "true";
  } catch {
    return false;
  }
};

// Generic API request function using proxy endpoint "/common"
export const apiRequest = async ({
  method = "GET",
  path,
  params = {},
  data = null,
  cacheKey = null,
  url = "/common",
}) => {
  const fullParams = {
    ...params,
    site: SITE,
    key: STACKEXCHANGE_KEY,
    backend_cache: isBackendCacheEnabled(),
    rerank: isRerankEnabled(),
    method,
    path,
  };

  if (cacheKey && isCacheEnabled()) {
    const cached = getCache(cacheKey);
    if (cached) return cached;
  }

  try {
    const response = await api.request({
      url,
      method: "POST",
      data: fullParams,
    });

    const result = response.data.items || response.data;

    if (cacheKey && isCacheEnabled()) {
      setCache(cacheKey, result);
    }

    return result;
  } catch (error) {
    console.error(`API request error: ${error}`);
    throw error;
  }
};

// API endpoint wrappers

export const fetchQuestions = async (params) =>
  apiRequest({
    method: "GET",
    path: "/questions",
    params,
    cacheKey: `questions_${JSON.stringify(params)}`,
  });

export const fetchQuestionById = async (id) =>
  apiRequest({
    method: "GET",
    path: `/questions/${id}`,
    params: { filter: "withbody" },
    cacheKey: `question_${id}`,
  });

export const fetchTags = async () =>
  apiRequest({ method: "GET", path: "/tags", cacheKey: "tags" });

export const fetchCollectives = async () =>
  apiRequest({ method: "GET", path: "/collectives", cacheKey: "collectives" });

export const fetchRelatedTags = async () =>
  apiRequest({
    method: "GET",
    path: "/tags",
    params: { order: "desc", sort: "popular" },
    cacheKey: "related_tags",
  });

export const fetchHotNetworkQuestions = async () =>
  apiRequest({
    method: "GET",
    path: "/questions",
    params: { order: "desc", sort: "hot" },
    cacheKey: "hot_network_questions",
  });

export const fetchUsers = async () =>
  apiRequest({
    method: "GET",
    path: "/users",
    params: { order: "desc", sort: "reputation" },
    cacheKey: "users",
  });

export const searchQuestions1 = async (query) =>
  apiRequest({
    method: "GET",
    path: "/search",
    params: { intitle: query },
    cacheKey: `search_${query}`,
  });

export const searchQuestions = async (params) =>
  apiRequest({
    method: "GET",
    path: "/search",
    params,
    cacheKey: `search_${JSON.stringify(params)}`,
    url: "/search",
  });

export const createQuestion = async ({ title, body, tags, accessToken }) =>
  apiRequest({
    method: "POST",
    path: "/questions/add",
    params: {
      access_token: accessToken,
      title,
      body,
      tags: tags.join(","),
    },
  });

export const upvoteQuestion = async (questionId, accessToken) =>
  apiRequest({
    method: "POST",
    path: `/questions/${questionId}/upvote`,
    params: {
      access_token: accessToken,
    },
  });

export const downvoteQuestion = async (questionId, accessToken) =>
  apiRequest({
    method: "POST",
    path: `/questions/${questionId}/downvote`,
    params: {
      access_token: accessToken,
    },
  });

export const fetchCommentsOnQuestion = async (questionId) =>
  apiRequest({
    method: "GET",
    path: `/questions/${questionId}/comments`,
    cacheKey: `comments_${questionId}`,
  });

export const postCommentToQuestion = async (
  questionId,
  body,
  accessToken,
  preview = false,
) => {
  const token = accessToken || localStorage.getItem("stack_token");
  if (!token) throw new Error("Access token is required to post a comment.");

  return apiRequest({
    method: "POST",
    path: `/posts/${questionId}/comments/add`,
    params: {
      body,
      preview: preview ? "true" : undefined,
      access_token: token,
    },
  });
};
