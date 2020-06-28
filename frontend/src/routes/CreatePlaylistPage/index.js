import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { createPlaylist } from "../../actions/playlists"
import { setSecretMessage } from "../../actions"
import { routes } from "../../utils/constants"

import Message from "../../components/Message"
import Loading from "../../containers/Loading"
import Appbar from "../../containers/Appbar"
import { PageWrapper } from "../../components/PageWrapper"
import { PageTitle } from "../../components/PageTitle"
import { PageForm } from "../../components/PageForm"
import { PageInput } from "../../components/PageInput"
import { PageButton } from "../../components/PageButton"

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

	const getPlaylistName = (e) => { setName(e.target.value) }

	const sendPlaylistName = (e) => {
		e.preventDefault()
		console.log(name)
		dispatch(createPlaylist(name))
		setName("")
	}

	return (
		<>
			<Appbar />
			<PageWrapper>
				<PageForm onSubmit={sendPlaylistName} style={ {marginBottom: "4rem"}}>
					<PageTitle variant="h6">
						Criar Playlist:
                	</PageTitle>
					<PageInput
						required
						variant="outlined"
						type='text'
						name='name'
						label="Nome da playlist"
						value={name}
						onChange={getPlaylistName}
						InputLabelProps={{ shrink: true }}
					/>
					<PageButton type="onSubmit" color="primary"
						variant={secreteMessage ? "outlined" : "contained"} >
						Criar
          			</PageButton>
				</PageForm>

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
			</PageWrapper>
			<Message />
			<Loading />
		</>
	)
}

export default CreatePlaylistPage
