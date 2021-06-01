import React, {useState, useEffect} from 'react';
import {Container} from 'reactstrap';
import Spinner from '../spinner';
import { createBrowserHistory } from 'history';
import { Router} from 'react-router-dom';

function ListTeams(props) {
    const customHistory = createBrowserHistory(); 
    <Router history={customHistory}/>
    const [teams, setTeams] = useState([]);
    const [loaded, isLoaded] = useState(false);
    const getTeams = async () => { 
        let team = [];      
        ['http://api.football-data.org/v2/teams/'].forEach(uri => {            
           fetch(uri, {headers: { 'X-Auth-Token': '86ee9d28464a49df893c73d621d41959' }  })
                .then((result) => result.json()) // Получаем ответ как текст
                .then(data => {
                    team.push(data.teams)                    
                    isLoaded(true)
                })            
             setTeams(team)  ;  
        });                     
     } 
    useEffect(() => {
       getTeams();
    }, [])
    const [value, setValue] = useState('');
    if(value != '' && value != null) {
        const query = new URLSearchParams();
        query.set("search", value); 
        customHistory.push(`/teams/?${query}`);
    }

    let search = new URLSearchParams(props.location.search);
    const token =  search.get('search');

    const filterTeam = teams.map(team => {
        return(
            team.filter(el => {
                if(token != '' &&  token != null){
                    const query = new URLSearchParams();
                    query.set("search", token); 
                    customHistory.push(`/teams/?${query}`);
                    return el.name.toLowerCase().includes(token.toLowerCase());
                } else {
                    return el.name.toLowerCase().includes(value.toLowerCase());
                }
               
            })
        )
    })


    if (!loaded) {
        return <Spinner/>;
    } else {
        return (
            <Container>
                <h2>Список команд</h2>              
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
                            <th>Название</th>
                            <th>Цвета клуба</th>
                            <th>Сайт</th>
                        </tr>
                    </thead>                    
                    <tbody>                        
                         {filterTeam.map(team => {
                            return(
                                team.map(el => {
                                    return (
                                        <tr key={el.id}>
                                            <td>{el.name}</td>
                                            <td>{el.clubColors}</td>
                                            <td><a href={el.website} target="_blank">{el.website}</a></td>                                
                                        </tr>   
                                    )
                                })
                             )                          
                                                       
                        })}
                        
                    </tbody>
                    
                    </table> 
                </div>
          </Container>
        )
    }
}
    

export default ListTeams;