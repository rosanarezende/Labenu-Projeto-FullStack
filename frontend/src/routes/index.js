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

function Routes(props) {
	const { history } = props

	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path={routes.acess} component={AccessPage} />
				<Route exact path={routes.login} component={LoginPage} />
				<Route exact path={routes.home} component={HomePage} />
				<Route exact path={routes.signup} component={SignupPage} />
				<Route exact path={routes.approveBand} component={ApproveBandPage} />
				<Route exact path={routes.genres} component={GenresPage} />
				<Route exact path={routes.profile} component={ProfilePage} />
				<Route exact path={routes.createAlbum} component={CreateAlbumPage} />
				<Route exact path={routes.createMusic} component={CreateMusicPage} />
				<Route exact path={routes.blockUser} component={BlockUserPage} />
				<Route exact path={routes.searchMusic} component={SearchPage} />
				<Route exact path={routes.musicDetail} component={MusicDetailPage} />
				<Route exact path={routes.premium} component={MakePremiumPage} />
				<Route exact path={routes.createPlaylist} component={CreatePlaylistPage} />
				<Route exact path={routes.myPlaylists} component={MyPlaylistsPage} />
				<Route exact path={routes.playlistDetail} component={PlaylistDetailPage} />
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</ConnectedRouter>
	)
}

export default Routes