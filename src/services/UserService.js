import HttpClient from './utils/HttpClient';

class UserService {
  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_API_URL);
  }

  async changePassword(id, body, token) {
    return this.httpClient.put(`/users/change-password/${id}`, body, token);
  }

  async changeEmail(id, body, token) {
    return this.httpClient.put(`/users/change-email/${id}`, body, token);
  }

  async forgoutPassword(email) {
    return this.httpClient.post('/users/forgot-password', { email });
  }

  async resetPassword({ email, token, password }) {
    return this.httpClient.post('/users/reset-password', { email, token, password });
  }

  async delete(id, token) {
    return this.httpClient.delete(`/users/${id}`, token);
  }
}

export default new UserService();
