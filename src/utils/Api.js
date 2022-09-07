class Api {
  constructor(options){
    this._baseUrl= options.baseUrl;
    this._headers= options.headers;
  }
  //запрос
  fetch (childUrl, method = 'GET', body = null, mode) {
    return fetch(this._baseUrl + childUrl,{
      headers: this._headers,
      method: method,
      body: body,
      mode: mode
    })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

}

export default Api;
