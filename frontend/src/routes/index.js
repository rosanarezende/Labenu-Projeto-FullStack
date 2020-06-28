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
import ProfilePage from './ProfilePage';
import CreateAlbumPage from './CreateAlbumPage';
import CreateMusicPage from './CreateMusicPage';
import BlockUserPage from './BlockUserPage';
import SearchPage from './SearchPage';
import MusicDetailPage from './MusicDetailPage';
import MakePremiumPage from './MakePremiumPage';
import CreatePlaylistPage from './CreatePlaylistPage';
import MyPlaylistsPage from './MyPlaylistsPage';
import PlaylistDetailPage from './PlaylistDetailPage';

import ProtectedRouteLogged from '../containers/ProtectedRouteLogged';
import ProtectedRouteListener from '../containers/ProtectedRouteListener';
import ProtectedRoutePayingListener from '../containers/ProtectedRoutePayingListener';
import ProtectedRouteAdministrator from '../containers/ProtectedRouteAdministrator';
import ProtectedRouteBand from '../containers/ProtectedRouteBand';

function Routes(props) {
	const { history } = props

	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path={routes.acess} component={AccessPage} />
				<Route exact path={routes.login} component={LoginPage} />
				<Route exact path={routes.signup} component={SignupPage} />

				<ProtectedRouteLogged exact path={routes.home} component={HomePage} />
				<ProtectedRouteLogged exact path={routes.profile} component={ProfilePage} />

				<ProtectedRouteListener exact path={routes.searchMusic} component={SearchPage} />
				<ProtectedRouteListener exact path={routes.musicDetail} component={MusicDetailPage} />

				<ProtectedRoutePayingListener exact path={routes.createPlaylist} component={CreatePlaylistPage} />
				<ProtectedRoutePayingListener exact path={routes.myPlaylists} component={MyPlaylistsPage} />
				<ProtectedRoutePayingListener exact path={routes.playlistDetail} component={PlaylistDetailPage} />
				
				<ProtectedRouteAdministrator exact path={routes.approveBand} component={ApproveBandPage} />
				<ProtectedRouteAdministrator exact path={routes.genres} component={GenresPage} />
				<ProtectedRouteAdministrator exact path={routes.blockUser} component={BlockUserPage} />
				<ProtectedRouteAdministrator exact path={routes.premium} component={MakePremiumPage} />

				<ProtectedRouteBand exact path={routes.createAlbum} component={CreateAlbumPage} />
				<ProtectedRouteBand exact path={routes.createMusic} component={CreateMusicPage} />
				
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</ConnectedRouter>
	)
}

export default Routes