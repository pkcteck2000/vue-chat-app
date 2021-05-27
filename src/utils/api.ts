import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://api.nytimes.com/svc/";
const API_KEY = "api-key=SsKYSPX945DsRYqYAyzXKfLN7aEgASTn";

const topStoriesAPI = (section: string): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}topstories/v2/${section}.json?${API_KEY}`);
};

export { topStoriesAPI };
