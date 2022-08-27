class HttpGateway {
  get = async (url) => {
    const requestOptions = {
      method: 'GET',
      headers: this.authHeader(url),
    };
    const response = await fetch(url, requestOptions);

    if (response.ok) {
      if (response.status === 204) return [];
      const dto = response.json();
      return dto;
    } else {
      if (response.status === 401) location.href = '/login';
    }
  };

  post = async (url, requestDto) => {
    let headers = this.authHeader(url);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestDto),
        headers: { ...headers, 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const stringResponse = await response.text();
        const responseDto =
          stringResponse === '' ? { success: true, data: {} } : { success: true, data: JSON.parse(stringResponse) };
        return responseDto;
      } else {
        const responseMessage = await response.json();
        if (response.status === 401) location.href = '/login';
        if (response.status >= 400 && response.status < 600) {
          const responseDto = {
            success: false,
            data: responseMessage,
          };
          return responseDto;
        }
      }
    } catch (error) {
      console.error('error', error);
      return { success: false, data: error };
    }
  };

  put = async (url, requestDto) => {
    let headers = this.authHeader(url);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(requestDto),
        headers: { ...headers, 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const stringResponse = await response.text();
        const responseDto =
          stringResponse === '' ? { success: true, data: {} } : { success: false, data: JSON.parse(stringResponse) };
        return responseDto;
      } else {
        const responseMessage = await response.json();
        if (response.status === 401) location.href = '/login';
        if (response.status >= 400 && response.status < 600) {
          const responseDto = {
            success: false,
            data: responseMessage,
          };
          return responseDto;
        }
      }
    } catch (error) {
      console.error('error', error);
      return { success: false, data: error };
    }
  };

  upload = async (url, fileDto) => {
    let headers = this.authHeader(url);

    const data = new FormData();
    data.append('file', fileDto);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: data,
        headers: { ...headers },
      });

      if (response.ok) {
        const stringResponse = await response.text();
        const responseDto =
          stringResponse === '' ? { success: true, data: {} } : { success: true, data: JSON.parse(stringResponse) };
        return responseDto;
      } else {
        const responseMessage = await response.json();
        if (response.status === 401) location.href = '/login';
        if (response.status >= 400 && response.status < 600) {
          const responseDto = {
            success: false,
            data: responseMessage,
          };
          return responseDto;
        }
      }
    } catch (error) {
      console.error('error', error);
      return { success: false, data: error };
    }
  };

  download = async (url) => {
    const requestOptions = {
      method: 'GET',
      headers: this.authHeader(url),
    };
    const response = await fetch(url, requestOptions);
    return response.blob();
  };

  authHeader = (url) => {
    const token = localStorage.getItem('token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  };
}

const httpGateway = new HttpGateway();
export default httpGateway;
