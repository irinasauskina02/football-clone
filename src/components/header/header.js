import React from 'react';

import {Link} from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        
        <div className="headerBlock">
            <ul className="headerLinks">
                <li>
                    <Link to="/competitions/">Список лиг</Link>
                </li>
                <li>
                    <Link to="/teams/">Список команд</Link>
                </li>  
                
            </ul>
           
        </div>         
            
        
    );
};

export default Header;