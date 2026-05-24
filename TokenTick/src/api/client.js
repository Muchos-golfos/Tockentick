const BASE_URL = 'http://localhost:3000/api';

export const getToken = () => localStorage.getItem('tokentick_token');
export const setToken = (t) => localStorage.setItem('tokentick_token', t);
export const removeToken = () => localStorage.removeItem('tokentick_token');

export const authFetch = async (endpoint, options = {}) => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (res.status === 401 || res.status === 403) {
        removeToken();
        window.location.href = '/login';
    }

    return res;
};