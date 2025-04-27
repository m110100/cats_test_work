import axios from 'axios';

export const apiCaller = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'X-API-KEY': import.meta.env.VITE_API_KEY,
	},
});

