import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { createPlaylist } from "../../actions/playlists"
import { setSecretMessage } from "../../actions"
import { routes } from "../../utils/constants"

import Message from "../../components/Message"
import Loading from "../../containers/Loading"
import Appbar from "../../containers/Appbar"

import * as S from "./styles"
import { Typography, Fab } from "@material-ui/core"
import { DirectionsRun } from "@material-ui/icons"


function CreatePlaylistPage() {
	const dispatch = useDispatch()
	const [name, setName] = useState("")
	const { secreteMessage } = useSelector(state => state.messages)

	useEffect(() => {
		dispatch(setSecretMessage(false))
	}, [dispatch])

	const getPlaylistName = (e) => {
		setName(e.target.value)
	}

	const sendPlaylistName = (e) => {
		e.preventDefault()
		console.log(name)
		dispatch(createPlaylist(name))
		setName("")
	}

	return (
		<>
			<Appbar />
			<S.CreatePlaylistWrapper>
				<S.CreatePlaylistForm onSubmit={sendPlaylistName}>
					<S.CreatePlaylistTitle>
						Criar Playlist:
                </S.CreatePlaylistTitle>
					<S.CreatePlaylistInput
						required
						variant="outlined"
						type='text'
						name='name'
						label="Nome da playlist"
						value={name}
						onChange={getPlaylistName}
						InputLabelProps={{ shrink: true }}
					/>
					<S.CreatePlaylistButton type="onSubmit" color="primary"
						variant={secreteMessage ? "outlined" : "contained"} >
						Criar
          			</S.CreatePlaylistButton>
				</S.CreatePlaylistForm>

				{secreteMessage &&
					<S.SecretMessage>
						<Typography variant="subtitle1" align="center">
							Sua nova playlist ainda está vazia…
						</Typography>
						<Typography variant="h6" align="center" style={{marginBottom: "1em"}}>
							Que tal adicionar músicas nela?
						</Typography>

						<Fab variant="extended" color="secondary" aria-label="go" 
							style={{ width: "200px", margin: "0 auto"}} 
							onClick={() => dispatch(push(routes.searchMusic)) }
						>
							<DirectionsRun style={{ marginRight: "10px"}}/>
          					LANÇAMENTOS
        				</Fab>
					</S.SecretMessage>
				}
			</S.CreatePlaylistWrapper>
			<Message />
			<Loading />
		</>
	)
}

export default CreatePlaylistPage