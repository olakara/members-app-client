class HttpGateway {
  get = async url => {

    const requestOptions = {
        method: "GET",
        headers: this.authHeader(url)
    };
    const response = await fetch(url, requestOptions);
    const dto = response.json();
    return dto;
  };

  post = async (url, requestDto) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(requestDto),
      headers: {
        "Content-Type": "application/json"
      }
    });
   
    if(response.ok) {        
        console.log('response ok')
    }else    
        console.log('response not ok');
    const responseDto = response.json();
    return responseDto;
  };


  authHeader = (url) => {
        
        const token = localStorage.getItem('token');
        if (token) {
            return { Authorization: `Bearer ${token}` };
        } else {
            return {};
        }
    }
}

const httpGateway = new HttpGateway();
export default httpGateway;