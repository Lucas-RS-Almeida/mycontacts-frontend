import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path, token) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let body = null;

    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(body?.error, response);
  }

  async post(path, body, token = '') {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    let json = null;

    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      json = await response.json();
    }

    if (response.ok) {
      return json;
    }

    throw new APIError(json?.error, response);
  }

  async put(path, body, token = '') {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    let json = null;

    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      json = await response.json();
    }

    if (response.ok) {
      return json;
    }

    throw new APIError(json?.error, response);
  }

  async delete(path, token) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let json = null;

    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      json = await response.json();
    }

    if (response.ok) {
      return json;
    }

    throw new APIError(json?.error, response);
  }
}

export default HttpClient;
