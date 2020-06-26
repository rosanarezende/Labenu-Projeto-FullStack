import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { push } from 'connected-react-router'

import { useMusicsList, useMusicsByGenre, useMyPlaylists, useUser } from "../../utils/customHooks"
import { setMusicIdSelected } from "../../actions"
import { addMusicToPlaylist } from "../../actions/playlists"

import Appbar from "../../containers/Appbar"
import Loading from "../../containers/Loading"
import Message from "../../components/Message"

import * as S from "./styles"
import { List, ListItem, ListItemAvatar, Avatar, Typography, Tooltip, ListItemSecondaryAction, IconButton, Menu, MenuItem } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import { LibraryAdd } from "@material-ui/icons"

function SearchPage() {
	const dispatch = useDispatch()
	const [page, setPage] = useState(1)
	const myPlaylists = useMyPlaylists()
	const { userRole } = useUser()
	const { inputSearch, selectedGenre } = useSelector(state => state.search)
	const { musicsList, numMusicsList } = useMusicsList(page)
	const { musicsByGenre, numMusicsByGenre } = useMusicsByGenre(selectedGenre, page)

	const [anchorEl, setAnchorEl] = useState(null); // levar
	const [musicIdClicked, setMusicIdClicked] = useState("")

	let filteredMusics = []
	let filteredSearch
	if (selectedGenre) {
		filteredSearch = musicsByGenre?.filter(music => {
			const musicName = music?.music_name?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
			const input = inputSearch?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
			return inputSearch ? musicName?.includes(input) : true
		})
	}
	else {
		filteredSearch = musicsList?.filter(music => {
			const musicName = music?.name?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
			const input = inputSearch?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
			return inputSearch ? musicName?.includes(input) : true
		})
	}
	if (inputSearch || selectedGenre) filteredMusics = filteredSearch

	const onClickMusic = async (musicId) => {
		await dispatch(setMusicIdSelected(musicId))
		dispatch(push(`/music/${musicId}`))
	}

	let pages
	if (selectedGenre) {
		if (Math.ceil(numMusicsByGenre / 10) < 3) { pages = 3 }
		else { pages = Math.ceil(numMusicsByGenre / 10) }
	}
	else {
		if (Math.ceil(numMusicsList / 10) < 3) { pages = 3 }
		else { pages = Math.ceil(numMusicsList / 10) }
	}

	const handleChange = (event, value) => { setPage(value) }

	const handleClick = (event, id) => {
		setAnchorEl(event.currentTarget)
		setMusicIdClicked(id)
	};

	const handleClose = (playlist, id) => {
		const info = {
			playlistId: playlist.id,
			musicId: id
		}
		dispatch(addMusicToPlaylist(info))
		setAnchorEl(null);
	};

	return (
		<>
			<Appbar />
			<S.SearchWrapper>
				{filteredMusics?.length === 0
					? inputSearch
						? <>
							<Pagination count={3} size="small" onChange={handleChange} color="primary" variant="text" style={{ margin: "2em auto" }} />
							<Typography align="center" variant="h6" paragraph>
								Não foi possível encontrar "<strong>{inputSearch}</strong>"
              				</Typography>
							<Typography variant="subtitle2" align="center">
								Tente novamente escrevendo o termo da busca de outra forma ou usando outro termo
              				</Typography>
						</>
						: selectedGenre
							? <>
								<Pagination count={3} size="small" onChange={handleChange} color="primary" variant="text" style={{ margin: "2em auto" }} />
								<Typography align="center" variant="h6" paragraph>
									Não foi possível encontrar músicas deste gênero.
                				</Typography>
								<Typography variant="subtitle2" align="center">
									Tente novamente escolhendo outro gênero.
                				</Typography>
							</>
							: <Typography align="center" variant="subtitle1">
								Pesquise por nome ou gênero das músicas
              				</Typography>


					:
					<>
						<Pagination count={pages} size="small" onChange={handleChange} color="primary" variant="text" style={{ margin: "2em auto" }} />
						<List component="nav">
							{filteredMusics?.map(music => {
								let id
								if (selectedGenre) { id = music?.music_id }
								else { id = music?.id }

								let name
								if (selectedGenre) { name = music?.music_name }
								else { name = music?.name }

								return (
									<ListItem key={id} >
										<ListItemAvatar onClick={() => onClickMusic(id)}>
											<Avatar style={{ backgroundColor: "rgba(30, 215, 96, 1)" }}>
												{name?.slice(0, 1).toUpperCase()}
											</Avatar>
										</ListItemAvatar>

										<Tooltip title="Clique para ver detalhes" aria-label="add">
											<S.ListTextHover
												primary={name}
												secondary={music?.band_name && music.band_name}
												onClick={() => onClickMusic(id)}
											/>
										</Tooltip>

										{userRole === "PAYING-LISTENER" &&
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
													// id="long-menu"
													anchorEl={anchorEl}
													// keepMounted
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
															<MenuItem key={playlist.id} onClick={() => handleClose(playlist, id)}>
																{playlist.name}
															</MenuItem>
														)
													})}
												</Menu>
											</ListItemSecondaryAction>
										}
									</ListItem>

								)
							})}

						</List>
					</>
				}
			</S.SearchWrapper>
			<Loading />
			{userRole === "PAYING-LISTENER" && <Message />}
		</>
	)
}

export default SearchPage