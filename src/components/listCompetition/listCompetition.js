import React, {useState, useEffect} from 'react';
import {Container} from 'reactstrap';
import Spinner from '../spinner';
import './listCompetition.css';
import { createBrowserHistory } from 'history';
import { Router} from 'react-router-dom';


function ListCompetition(props){
  const customHistory = createBrowserHistory(); 
  <Router history={customHistory}/>
 const [competition, setCompetitions] = useState([]);
 const [loaded, isLoaded] = useState(false);
 const getCompetitions = async () => {
    await fetch(`http://api.football-data.org/v2/competitions/`, {
        headers: {                    
            'X-Auth-Token': '86ee9d28464a49df893c73d621d41959'
            }
        })
        .then((result) => result.json()) 
        .then(data => {
          setCompetitions(data.competitions)
          isLoaded(true)
        }) 
                  
  } 
 useEffect(() => {
    getCompetitions();
  }, [])
  const [value, setValue] = useState('');
  if(value != '' && value != null) {
    const query = new URLSearchParams();
    query.set("search", value); 
    customHistory.push(`/competitions/?${query}`);
  }
   
  
  let search = new URLSearchParams(props.location.search);
  const token =  search.get('search');

  const filterCompetitions = competition.filter((comp) => {  
    
    if(token != '' &&  token != null){
      const query = new URLSearchParams();
      query.set("search", token); 
      customHistory.push(`/competitions/?${query}`);
      return comp.name.toLowerCase().includes(token.toLowerCase());
    } else {
      return comp.name.toLowerCase().includes(value.toLowerCase());
    }
    
  });

  

  if (!loaded) {
    return <Spinner/>;
  } else {
    return (
      <Container>
                <h2>Список лиг</h2>
                
                <div className="search-panel">
                    <input
                        className="from-control search-input"
                        type="text"
                        placeholder = "Поиск по записям"                    
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <div className="table-responsive">
                  <table className="table table-condensed table-hover">
                    <thead>
                      <tr>
                        <th>Турнир</th>
                        <th>Дата проведения</th>
                        
                      </tr>
                    </thead>
                    
                    <tbody>
                     {filterCompetitions.map((comp) => {
                        let startDate = null;
                        let endDate = null;
                        if(comp.currentSeason != null) {
                          const tmp = Object.values(comp.currentSeason);                         
                          startDate = tmp[1];
                          endDate = tmp[2];
                        }
                       return(
                          <tr key={comp.id}>
                              <td>{comp.name}</td>
                              <td>{startDate} - {endDate}</td>
                           </tr> 
                       )
                     })}
                    </tbody>
                    
                  </table> 
                </div>
      </Container>
    )
  }
}

export default ListCompetition;
