import React, { useState } from "react"
import { useDispatch } from 'react-redux'

import { useAllGenres, useBandAlbuns } from "../../utils/customHooks"
import { createAlbum, deleteAlbum } from "../../actions/albuns"

import Appbar from "../../containers/Appbar"
import Message from "../../components/Message"
import Loading from "../../containers/Loading"
import { PageWrapper } from "../../components/PageWrapper"
import { PageTitle } from "../../components/PageTitle"
import { PageForm } from "../../components/PageForm"
import { PageInput } from "../../components/PageInput"
import { PageButton } from "../../components/PageButton"

import * as S from "./styles"
import { MenuItem, Checkbox, ListItemText, Select, OutlinedInput, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton } from "@material-ui/core"
import { Delete } from "@material-ui/icons"


function CreateAlbumPage() {
    const dispatch = useDispatch()
    const allGenres = useAllGenres()
    const bandAlbuns = useBandAlbuns()
    const [albumName, setAlbumName] = useState("")
    const [genreId, setGenreId] = useState([]);
    
    const getAlbumName = (e) => { setAlbumName(e.target.value) }

    const handleChange = (e) => { setGenreId(e.target.value) }

    const sendInformations = (e) => {
        e.preventDefault()
        const info = {
            name: albumName,
            genreList: genreId
        }
        dispatch(createAlbum(info))
        setAlbumName("")
        setGenreId([])
    }

    const onDeleteAlbum = (id) => {
        if (window.confirm("Deseja deletar esse álbum?")) {
            dispatch(deleteAlbum(id))
        }
    }

    return (
        <>
            <Appbar />
            <PageWrapper>
                <PageForm onSubmit={sendInformations}>
                    <PageTitle variant="h6">
                        Criar álbum:
                    </PageTitle>
                    <PageInput
                        required
                        variant="outlined"
                        type='text'
                        name='input'
                        label="Nome do álbum"
                        value={albumName}
                        onChange={getAlbumName}
                        InputLabelProps={{ shrink: true }}
                    />
                    <S.CreateAlbumFormControl required>
                        <S.CreateAlbumInputLabel id="mutiple-checkbox" shrink variant="outlined">
                            Selecione o(s) gênero(s):
                        </S.CreateAlbumInputLabel>
                        <Select
                            labelId="mutiple-checkbox"
                            id="mutiple-checkbox"
                            multiple
                            value={genreId}
                            onChange={handleChange}
                            input={<OutlinedInput />}
                            renderValue={() => genreId.length === 1 ? "1 gênero selecionado" : `${genreId.length} gêneros selecionados`}
                        >
                            {allGenres.map((genre) => (
                                <MenuItem key={genre.id} value={genre.id}>
                                    <Checkbox checked={genreId.indexOf(genre.id) > -1} />
                                    <ListItemText primary={genre.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </S.CreateAlbumFormControl>

                    <PageButton type="onSubmit" variant="contained" color="primary">
                        Criar
                    </PageButton>
                </PageForm>

                <div>
                    <Typography variant="h6">
                        Álbuns cadastrados:
                    </Typography>
                    <List component="nav">
                        {bandAlbuns.map(album =>
                            <ListItem key={album.id}>
                                <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: "rgba(30, 215, 96, 1)" }}>
                                        {album?.name.slice(0, 1).toUpperCase()}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={album.name} />
                                <ListItemSecondaryAction onClick={() => onDeleteAlbum(album.id)}>
                                    <IconButton edge="end" aria-label="icon" color="default">
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </List>
                </div>

            </PageWrapper>
            <Message />
            <Loading />
        </>
    )
}

export default CreateAlbumPage