import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import Appbar from "../../containers/Appbar"
import { useBandAlbuns } from "../../utils/customHooks"
import { createMusic } from "../../actions"

import * as S from "./styles"
import { MenuItem } from "@material-ui/core"
import Message from "../../components/Message"

function CreateMusicPage() {
    const bandAlbuns = useBandAlbuns()
    const dispatch = useDispatch()
    const [musicForm, setMusicForm] = useState({})

    const getMusicForm = (e) => {
        const { name, value } = e.target
        setMusicForm({ ...musicForm, [name]: value })
    }

    const sendInformations = (e) => {
        e.preventDefault()
        dispatch(createMusic(musicForm))
        setMusicForm({})
    }


    return (
        <>
            <Appbar />
            <S.CreateMusicWrapper>
                <S.CreateMusicForm onSubmit={sendInformations}>
                    <S.CreateMusicTitle variant="h6">
                        Criar música:
                    </S.CreateMusicTitle>
                    <S.CreateMusicInput
                        required
                        variant="outlined"
                        type='text'
                        name='name'
                        label="Nome da música"
                        value={musicForm.name}
                        onChange={getMusicForm}
                        InputLabelProps={{ shrink: true }}
                    />
                    <S.CreateMusicInput
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
                    </S.CreateMusicInput>
                    <S.CreateMusicButton type="onSubmit" variant="contained" color="primary">
                        Criar
                    </S.CreateMusicButton>
                </S.CreateMusicForm>
            </S.CreateMusicWrapper>
            <Message />
        </>
    )
}

export default CreateMusicPage