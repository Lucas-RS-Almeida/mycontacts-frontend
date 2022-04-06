import HttpClient from './utils/HttpClient';

class AuthService {
  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_API_URL);
  }

  async logIn({ email, password }) {
    return this.httpClient.post('/auth/log-in', { email, password });
  }

  async signUp({ email, password }) {
    return this.httpClient.post('/auth/sign-up', { email, password });
  }
}

export default new AuthService();
