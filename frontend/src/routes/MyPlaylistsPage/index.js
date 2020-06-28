import React from "react"
import { useDispatch } from "react-redux"
import { push } from "connected-react-router"

import { useMyPlaylists } from "../../utils/customHooks"
import { deletePlaylist, setPlaylistIdSelected } from "../../actions/playlists"

import Appbar from "../../containers/Appbar"
import Message from "../../components/Message"
import Loading from "../../containers/Loading"
import { PageWrapper } from "../../components/PageWrapper"

import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Tooltip } from "@material-ui/core"
import { Delete } from "@material-ui/icons"

function MyPlaylistsPage() {
	const myPlaylists = useMyPlaylists()
	const dispatch = useDispatch()

	const onClickPlaylist = async (playlist) => {
		await dispatch(setPlaylistIdSelected(playlist))
		dispatch(push(`/playlist/${playlist?.id}`))
	}

	const onDeletePlaylist = (id) => {
		if (window.confirm("Deseja deletar essa playlist?")) {
			dispatch(deletePlaylist(id))
		}
	}

	return (
		<>
			<Appbar />
			<PageWrapper>
				<Typography variant="h6">
					Minhas playlists
          		</Typography>
				<List component="nav">
					{myPlaylists.map(playlist =>
						<ListItem key={playlist?.id}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: "rgba(30, 215, 96, 1)" }}>
									{playlist?.name.slice(0, 1).toUpperCase()}
								</Avatar>
							</ListItemAvatar>

							<Tooltip title="Clique para ver detalhes" aria-label="add">
								<ListItemText
									primary={playlist?.name}
									secondary={playlist.collaborative === 0 ? "Playlist privada" : "Playlist colaborativa"}
									onClick={() => onClickPlaylist(playlist)}
								/>
							</Tooltip>

							<ListItemSecondaryAction>
								<IconButton edge="end" aria-label="icon" color="default"
									onClick={() => onDeletePlaylist(playlist?.id)}
								>
									<Delete />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					)}
				</List>
			</PageWrapper>
			<Message />
			<Loading />
		</>
	)
}

export default MyPlaylistsPage