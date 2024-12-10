import axios from 'axios';

class AxiosInstance {
	constructor() {
		this.apiBaseUrl = import.meta.env.VITE_APP_BASE_URL;
		this.apiSquashBaseUrl = import.meta.env.VITE_APP_SQUASH_BASE_URL;
		this.apiMeloukBaseUrl = import.meta.env.VITE_APP_MELOUK_BASE_URL;
		this.apiHeaderEnrichmentUrl =
			import.meta.env.VITE_APP_HEADER_ENRICHMENT_URL;
		this.apiSubscriptionBaseUrl =
			import.meta.env.VITE_APP_SUBSCRIPTION_BASE_URL;
		this.subsciptionAppKey = import.meta.env.VITE_APP_SUBSCRIPTION_API_KEY;

		this.headers = {
			'Content-Type': 'application/json',
			'Accept-Language': 'ar',
		};

		this.baseAxios = axios.create({
			baseURL: this.apiBaseUrl,
			headers: this.headers,
		});

		this.baseSquashAxios = axios.create({
			baseURL: this.apiSquashBaseUrl,
			headers: this.headers,
		});

		this.baseMeloukAxios = axios.create({
			baseURL: this.apiMeloukBaseUrl,
			headers: {
				...this.headers,
				'Application-key': import.meta.env.VITE_APP_MELOUK_APP_KEY,
			},
		});

		this.baseHeaderEnrichmentAxios = axios.create({
			baseURL: this.apiHeaderEnrichmentUrl,
			headers: this.headers,
		});

		this.baseSubscriptionAxios = axios.create({
			baseURL: this.apiSubscriptionBaseUrl,
			headers: {
				...this.headers,
				application_key: this.subsciptionAppKey,
			},
		});

		this.baseAxios = axios.create({
			baseURL: this.apiBaseUrl,
			headers: {
				'Content-Type': 'application/json',
				'Accept-Language': 'ar',
			},
		});
	}
}

export default new AxiosInstance();
