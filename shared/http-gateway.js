class HttpGateway {
  get = async path => {
    const response = await fetch(path);
    const dto = response.json();
    return dto;
  };

  post = async (path, requestDto) => {
    const response = await fetch(path, {
      method: "POST",
      body: JSON.stringify(requestDto),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const responseDto = response.json();
    return responseDto;
  };
}

const httpGateway = new HttpGateway();
export default httpGateway;