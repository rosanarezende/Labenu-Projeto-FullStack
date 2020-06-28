import React, { useState } from "react"
import { useDispatch } from 'react-redux'

import { createMusic, deleteMusic, editMusicName } from "../../actions/musics"
import { changeAlbum } from "../../actions/albuns"
import { useBandAlbuns, useMyMusics } from "../../utils/customHooks"

import Appbar from "../../containers/Appbar"
import Message from "../../components/Message"
import Loading from "../../containers/Loading"
import { PageWrapper } from "../../components/PageWrapper"
import { PageTitle } from "../../components/PageTitle"
import { PageForm } from "../../components/PageForm"
import { PageInput } from "../../components/PageInput"
import { PageButton } from "../../components/PageButton"

import { MenuItem, ListItemText, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton, TextField } from "@material-ui/core"
import { Delete, Edit, Check } from "@material-ui/icons"

function CreateMusicPage() {
	const dispatch = useDispatch()
	const bandAlbuns = useBandAlbuns()
	const myMusics = useMyMusics()
	const [musicForm, setMusicForm] = useState({})
	const [appearsEdit, setAppearsEdit] = useState(false)
	const [musicToEdit, setMusicToEdit] = useState({})
	const [name, setName] = useState("")
	const [album, setAlbum] = useState("")

	const getMusicForm = (e) => {
		const { name, value } = e.target
		setMusicForm({ ...musicForm, [name]: value })
	}

	const sendInformations = (e) => {
		e.preventDefault()
		dispatch(createMusic(musicForm))
		setMusicForm({})
	}

	const onDeleteMusic = (id) => {
		console.log(id)
		if (window.confirm("Deseja deletar essa música?")) {
			dispatch(deleteMusic(id))
		}
	}

	const onEditMusic = (music) => {
		setAppearsEdit(true)
		setMusicToEdit(music)
	}

	const onChangeName = (e) => { setName(e.target.value) }

	const closeEditName = async () => {
		const info = {
			musicId: musicToEdit.music_id,
			musicName: name
		}
		await dispatch(editMusicName(info))
		setAppearsEdit(false)
	}

	const onChangeAlbum = (e) => { setAlbum(e.target.value) }

	const closeEditAlbum = async () => {
		const info = {
			albumId: album,
			musicId: musicToEdit.music_id
		}
		await dispatch(changeAlbum(info))
		setAppearsEdit(false)
	}

	return (
		<>
			<Appbar />
			<PageWrapper>
				<PageForm onSubmit={sendInformations}>
					<PageTitle variant="h6">
						Criar música:
          			</PageTitle>
					<PageInput
						required
						variant="outlined"
						type='text'
						name='name'
						label="Nome da música"
						value={musicForm.name}
						onChange={getMusicForm}
						InputLabelProps={{ shrink: true }}
					/>
					<PageInput
						select
						required
						key="albumId"
						variant="outlined"
						margin="normal"
						label="Álbum"
						name="albumId"
						onChange={getMusicForm}
						value={musicForm.albumId || ""}
						InputLabelProps={{ shrink: true }}
					>
						{bandAlbuns.map(album =>
							<MenuItem value={album.id} key={album.id}>{album.name}</MenuItem>
						)}
					</PageInput>
					<PageButton type="onSubmit" variant="contained" color="primary">
						Criar
          			</PageButton>
				</PageForm>

				<div>
					<Typography variant="h6">
						Músicas cadastradas:
          			</Typography>

					{appearsEdit
						? <div style={{ margin: "1rem auto" }}>
							<List>
								<ListItem style={{ marginBotton: "2rem" }}>
									<ListItemText primary="Nome: " />
									<ListItemText secondary={
										<TextField
											name='name'
											placeholder={musicToEdit?.music_name}
											type='text'
											value={name || ''}
											onChange={onChangeName}
											required
											InputLabelProps={{ shrink: true }}
										/>
									} />
									<ListItemSecondaryAction>
										<IconButton edge="end" aria-label="icon" color="primary"
											onClick={closeEditName}
										>
											<Check />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>

								<ListItem>
									<ListItemText primary="Álbum: " />
									<ListItemText secondary={
										<TextField
											InputLabelProps={{ shrink: true }}
											select
											required
											key="album"
											label="Selecione um álbum"
											name="album"
											onChange={onChangeAlbum}
											value={album || ""}
											style={{ minWidth: "180px" }}
										>
											{bandAlbuns.map(album =>
												<MenuItem value={album.id} key={album.id}>{album.name}</MenuItem>
											)}
										</TextField>
									} />
									<ListItemSecondaryAction>
										<IconButton edge="end" aria-label="icon" color="primary"
											onClick={closeEditAlbum}
										>
											<Check />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							</List>
						</div>

						: <List component="nav">
							{myMusics.map(music =>
								<ListItem key={music?.music_id}>
									<ListItemAvatar>
										<Avatar style={{ backgroundColor: "rgba(30, 215, 96, 1)" }}>
											{music?.music_name?.slice(0, 1).toUpperCase()}
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={music?.music_name}
										secondary={`Álbum: ${music?.album_name}`}
									/>
									<ListItemSecondaryAction>
										<IconButton edge="end" aria-label="icon" color="default"
											onClick={() => onEditMusic(music)}
											style={{ marginRight: "2vw" }}
										>
											<Edit />
										</IconButton>
										<IconButton edge="end" aria-label="icon" color="default"
											onClick={() => onDeleteMusic(music?.music_id)}
										>
											<Delete />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							)}
						</List>
					}
				</div>

			</PageWrapper>
			<Message />
			<Loading />
		</>
	)
}

export default CreateMusicPage