export namespace Cat {
	export type Entity = {
		id: string;
		url: string;
		width: number;
		height: number;
		mime_type: string;
	};

	export namespace Api {
		export namespace GetCatImage {
			export type QueryParameters = Partial<{
				size: 'small' | 'med' | 'thumb';
				mime_types: string;
				format: string;
				has_breeds: boolean;
				order: 'RANDOM' | 'ASC' | 'DESC';
				page: number;
				limit: number;
			}>;

			export type Response = Entity;
		}
	}
}

