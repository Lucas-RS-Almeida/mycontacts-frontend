import HttpClient from './utils/HttpClient';

class CategoryService {
  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_API_URL);
  }

  async load(token) {
    return this.httpClient.get('/categories', token);
  }
}

export default new CategoryService();
