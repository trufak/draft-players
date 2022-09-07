class InfoBasketApi {
  constructor() {
    this._baseUrl= 'https://org.infobasket.su';
  }

  getTeamStats () {
    return fetch(`${this._baseUrl}/Comp/GetTeamStats/37490?from=&to=&page=0`)
      .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getPersonPhotoUrl(personId)
  {
    return fetch(`${this._baseUrl}/Widget/GetPersonPhoto/${personId}?d=1`,{
      mode: 'no-cors'
    })
      .then(res => {
        console.log(res);
      })
  }
}

const infoBasketApi = new InfoBasketApi();
export default infoBasketApi;








