import HttpClient from './utils/HttpClient';

class ContactService {
  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_API_URL);
  }

  async load(token, orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`, token);
  }

  async getById(id, token) {
    return this.httpClient.get(`/contacts/${id}`, token);
  }

  async create(token, body) {
    return this.httpClient.post('/contacts', body, token);
  }

  async update(id, body, token) {
    return this.httpClient.put(`/contacts/${id}`, body, token);
  }

  async delete(id, token) {
    return this.httpClient.delete(`/contacts/${id}`, token);
  }
}

export default new ContactService();
