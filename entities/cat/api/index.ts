import { apiCaller } from 'shared/api';
import { Cat } from '../model';

export const getCat = async (
	params: Cat.Api.GetCatImage.QueryParameters = {
		size: 'med',
		mime_types: 'jpg',
		format: 'json',
		has_breeds: false,
		order: 'RANDOM',
		limit: 1,
	},
): Promise<Cat.Api.GetCatImage.Response[]> => {
	try {
		const response = await apiCaller.get<Cat.Api.GetCatImage.Response[]>('images/search', {
			params,
		});

		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

