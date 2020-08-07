import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create'
import PanelControl from './pages/PanelControl';


const Routes = () =>{
    return(
       <BrowserRouter>
       <Route component={Home} path='/' exact/>
       <Route component={Create} path='/create'/>
       <Route component={PanelControl} path='/admin'/>
       </BrowserRouter>
    );
}

export default Routes;