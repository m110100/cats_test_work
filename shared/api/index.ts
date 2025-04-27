import axios from 'axios';

export const apiCaller = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'https://api.thecatapi.com/v1',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'X-API-KEY': import.meta.env.VITE_API_KEY,
	},
});

