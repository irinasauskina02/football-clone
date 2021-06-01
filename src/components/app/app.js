import React, {Component} from 'react';
import {Container} from 'reactstrap';
import ListCompetition from '../listCompetition';
import ListTeams from '../listTeams';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from '../header';



export default class App extends Component {
    render() {
        return(
            <Router>
                <div className="app"> 
                    <Container>
                        <Header/>
                    </Container>
                    <Container>
                        <Route path='/competitions' component={ListCompetition}/> 
                        <Route path='/teams' component={ListTeams}/> 
                        
                    </Container>
                    
            </div>
        </Router>
        );
    }
}
