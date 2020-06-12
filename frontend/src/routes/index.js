import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'

import { routes } from '../utils/constants'

import HomePage from './HomePage';
import NotFound from './NotFound';

function Routes(props){
    const { history } = props
    
    return(
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path={routes.home} component={HomePage}/>
                {/* <Route exact path={routes.detail} component={DetailPage}/> */}
                <Route path="*" component={NotFound} />
            </Switch>
        </ConnectedRouter>
    )
}

export default Routes