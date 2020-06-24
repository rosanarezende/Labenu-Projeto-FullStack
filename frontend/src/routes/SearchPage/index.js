import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { push } from 'connected-react-router'

import { useMusicsList, useMusicsByGenre } from "../../utils/customHooks"
import { setMusicIdSelected } from "../../actions"

import Appbar from "../../containers/Appbar"
import Loading from "../../containers/Loading"

import * as S from "./styles"
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"

function SearchPage() {
	const dispatch = useDispatch()
	const [page, setPage] = useState(1)
	const { inputSearch, selectedGenre } = useSelector(state => state.search)
	const { musicsList, numMusicsList } = useMusicsList(page)
	const { musicsByGenre, numMusicsByGenre } = useMusicsByGenre(selectedGenre, page)

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
					: <>
						<Pagination count={pages} size="small" onChange={handleChange} color="primary" variant="text" style={{ margin: "2em auto" }} />
						<List component="nav">
							{filteredMusics?.map(music => {
								let id
								if (selectedGenre) { id = music?.music_id }
								else { id = music?.id }
								let name
								if (selectedGenre) { name = music?.music_name }
								else { name = music?.name }
								return (<ListItem key={id} onClick={() => onClickMusic(id)}>
									<ListItemAvatar>
										<Avatar style={{ backgroundColor: "rgba(30, 215, 96, 1)" }}>
											{name?.slice(0, 1).toUpperCase()}
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={name}
										secondary={music?.band_name && music.band_name}
									/>
								</ListItem>)
							})}
						</List>
					</>
				}
			</S.SearchWrapper>
			<Loading />
		</>
	)
}

export default SearchPage