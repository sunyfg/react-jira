import { User } from "./types/user";

const apiUrl = import.meta.env.VITE_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      return handleUserResponse(data);
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      return handleUserResponse(data);
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 登出
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
