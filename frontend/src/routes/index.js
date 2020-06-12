import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'

import { routes } from '../utils/constants'

import AccessPage from './AccessPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import SignupPage from './SignupPage';
import ApproveBandPage from './ApproveBandPage';
import GenresPage from './GenresPage';

function Routes(props){
    const { history } = props
    
    return(
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path={routes.acess} component={AccessPage}/>
                <Route exact path={routes.login} component={LoginPage}/>
                <Route exact path={routes.home} component={HomePage}/>
                <Route exact path={routes.signup} component={SignupPage}/>
                <Route exact path={routes.approveBand} component={ApproveBandPage}/>
                <Route exact path={routes.genres} component={GenresPage}/>
                {/* <Route exact path={routes.detail} component={DetailPage}/> */}
                <Route path="*" component={NotFoundPage} />
            </Switch>
        </ConnectedRouter>
    )
}

export default Routes