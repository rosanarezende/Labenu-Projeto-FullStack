import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import Appbar from "../../containers/Appbar"
import { useAllGenres } from "../../utils/customHooks"
import { createAlbum } from "../../actions"

import * as S from "./styles"
import { MenuItem, Checkbox, ListItemText, Select, OutlinedInput } from "@material-ui/core"
import Message from "../../components/Message"

function CreateAlbumPage(){
    const allGenres = useAllGenres()
    const [albumName, setAlbumName] = useState("")
    const [genreId, setGenreId] = useState([]);
    const dispatch = useDispatch()

    const getAlbumName = (e) => {
        setAlbumName(e.target.value)
    }

    const handleChange = (e) => {
        setGenreId(e.target.value);
      };
    
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

    return (
        <>
            <Appbar/>
            <S.CreateAlbumWrapper>
                <S.CreateAlbumForm onSubmit={sendInformations}>
                    <S.CreateAlbumTitle variant="h6">
                        Criar álbum:
                    </S.CreateAlbumTitle>
                    <S.CreateAlbumInput
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
                            input={<OutlinedInput/>}
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

                    <S.CreateAlbumButton type="onSubmit" variant="contained" color="primary">
                        Criar
                    </S.CreateAlbumButton>

                </S.CreateAlbumForm>
            </S.CreateAlbumWrapper>
            <Message/>
        </>
    )
}

export default CreateAlbumPage