import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { useMyPlaylists } from "../../utils/customHooks"
import { addMusicToPlaylist } from "../../actions/playlists"

import { Tooltip, ListItemSecondaryAction, IconButton, Menu, MenuItem } from "@material-ui/core"
import { LibraryAdd } from "@material-ui/icons"

function MenuAddPlaylists(props) {
	const dispatch = useDispatch()
	const { id } = props
	const myPlaylists = useMyPlaylists()
	const [anchorEl, setAnchorEl] = useState(null)
	const [musicIdClicked, setMusicIdClicked] = useState("")

	const handleClick = (event, id) => {
		setAnchorEl(event.currentTarget)
		setMusicIdClicked(id)
	};

	const handleClose = (playlist, id) => {
		const info = {
			playlistId: playlist?.id,
			musicId: id
		}
		dispatch(addMusicToPlaylist(info))
		setAnchorEl(null);
	};

	return (
		<>
			<ListItemSecondaryAction>
				<Tooltip title="Adicionar a playlist" aria-label="add">
					<IconButton edge="end" aria-label="icon" color="default"
						aria-controls="long-menu"
						aria-haspopup="true"
						onClick={(event) => handleClick(event, id)}
					>
						<LibraryAdd />
					</IconButton>
				</Tooltip>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl) && (id === musicIdClicked)}
					onClose={() => handleClose()}
					PaperProps={{
						style: {
							maxHeight: 48 * 4.5,
							width: '20ch',
						},
					}}
				>
					{myPlaylists.map(playlist => {
						return (
							<MenuItem 
								key={playlist.id} 
								onClick={() => handleClose(playlist, id)}
							>
								{playlist.name}
							</MenuItem>
						)
					})}
				</Menu>
			</ListItemSecondaryAction>
		</>
	)
}

export default MenuAddPlaylists
