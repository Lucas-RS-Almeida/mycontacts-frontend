class APIError extends Error {
  constructor(message, response) {
    super();

    this.name = 'APIError';
    this.response = response;
    this.message = message || `${this.response.status} - ${this.response.statusText}`;
  }
}

export default APIError;
