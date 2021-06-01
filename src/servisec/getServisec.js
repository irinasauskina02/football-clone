export default class getServisec {
  constructor() {
    this._apiBase = 'http://api.football-data.org/v2'
  }
  getResource = async (url) => {
    try {         
      let response = await fetch(`${this._apiBase}${url}`, {
        headers: {                     // устанавливаем заголовки
          'X-Auth-Token': '86ee9d28464a49df893c73d621d41959'
        }
      });
      return await response.json();    
    } catch(error) {
      console.log(error);
    }
  }

  getCompetitions = async () => {
    const res = await this.getResource('/competitions/'); 
    return res.competitions.map(this._transformComp); 
  }    
  getTeams = () => {
    return this.getResource('/competitions/2000/teams'); 
  }
  getTeam = () => {
    return this.getResource('/teams/18'); 
  }

  _transformComp(data) {
    return{
        id: data.id,
        name: data.name
    } 
  }
}