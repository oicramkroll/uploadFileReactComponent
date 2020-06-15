import React from  'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateRouter from './components/PrivateRouter';

import fileUploadAWS from './pages/fileUpladAWS';
import Logon from './pages/Logon';
import LinksManager from './pages/LinksManager';
import PublicLinks from './pages/PublicLinks';
import ReservaHotel from './pages/reservaHotel';


export default ()=>{
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Logon} />
            <PrivateRouter path="/LinksManager"  component={LinksManager} />
            <Route path="/links/:id?" component={PublicLinks}/>
            <Route path="/links/:tag?" component={PublicLinks}/>
            <Route path="/upload" component={fileUploadAWS} /> 
            <Route path="/reserva/hotel" component={ReservaHotel} />
        </Switch>
    </BrowserRouter>
    );
}
