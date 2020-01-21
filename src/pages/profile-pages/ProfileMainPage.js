import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

const ProfileMainPage = () => {

    return (
            <>
            <button>Informacje o koncie</button>
            <button>Zamówienia</button>
            <button>Skomponowane ubrania</button>
            <button><Link to="/dimensions">Wymiary</Link></button>

            
            </>
        
    );
}

export default ProfileMainPage;