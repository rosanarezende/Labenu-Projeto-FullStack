import React, { useState } from "react"
import { useDispatch } from 'react-redux'

import { useAllGenres } from "../../utils/customHooks"
import { addGenre } from "../../actions/genres"

import Appbar from "../../containers/Appbar"
import Message from "../../components/Message"
import Loading from "../../containers/Loading"
import { PageWrapper } from "../../components/PageWrapper"

import * as S from "./styles"
import { Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@material-ui/core"


function GenresPage() {
    const allGenres = useAllGenres()
    const [genreName, setGenreName] = useState("")
    const dispatch = useDispatch()

    const getGenreName = (e) => {
        setGenreName(e.target.value)
    }

    const sendGenreName = (e) => {
        e.preventDefault()
        dispatch(addGenre(genreName.toUpperCase()))
        setGenreName("")
    }

    return (
        <>
            <Appbar />
            <PageWrapper>
                <S.GenreForm onSubmit={sendGenreName}>
                    <S.GenreTitle variant="h6">
                        Cadastrar gênero musical:
                    </S.GenreTitle>

                    <S.GenreIput
                        name='input'
                        variant="outlined"
                        label="Nome do gênero"
                        placeholder='ex: Jazz, MPB, etc.'
                        type='text'
                        value={genreName}
                        onChange={getGenreName}
                        required
                    />

                    <Button type="onSubmit" variant="outlined" color="primary">
                        Cadastrar
                    </Button>
                </S.GenreForm>

                <div>
                    <Typography variant="h6">
                        Gêneros cadastrados:
                    </Typography>
                    <List component="nav">
                        {allGenres.map(genre =>
                            <ListItem key={genre.id}>
                                <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: "rgba(30, 215, 96, 1)" }}>
                                        {genre?.name.slice(0, 1).toUpperCase()}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={genre.name} />
                            </ListItem>
                        )}
                    </List>
                </div>
            </PageWrapper>
            <Message/>
            <Loading/>
        </>
    )
}

export default GenresPage