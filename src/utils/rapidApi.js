import Api from "./Api";

class RapidApi {
  constructor() {
    this._api = new Api({
      baseUrl: 'https://sportscore1.p.rapidapi.com',
      headers: {
        'X-RapidAPI-Key': '3b8c506c04msh9fad44fdbdae192p156aaejsn24b4219b7cbd',
        'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
      }
    });
  }

  getPlayers (page = 1) {
    return this._api.fetch(`/sports/1/players?page=${page}`);
  }
}

const rapidApi = new RapidApi();
export default rapidApi;








