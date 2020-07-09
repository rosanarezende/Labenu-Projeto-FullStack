import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { push } from 'connected-react-router'

import { useAllGenres } from "../../utils/customHooks"
import { routes } from "../../utils/constants"
import { setInputSearch } from "../../actions"
import { setGenreSelected } from "../../actions/genres"

import { TextField, MenuItem } from "@material-ui/core"
import * as S from "./styles"
import { Search } from "@material-ui/icons"

function SearchContainer() {
    const dispatch = useDispatch()
    const { inputSearch, selectedGenre } = useSelector(state => state.search)

    const allGenres = useAllGenres()
    
    const onChangeGenre = (event) => {
        dispatch(setGenreSelected(event.target.value))
    }

    const onChangeInput = (event) => {
        dispatch(setInputSearch(event.target.value))
    }
        
    return (
        <>
            <S.DivSearch onClick={() => dispatch(push(routes.searchMusic))}>
                <S.DivSearchIcons>
                    <Search/>
                </S.DivSearchIcons>
                <S.InputBaseStyled
                    placeholder="Música..."
                    value={inputSearch || ""}
                    onChange={onChangeInput}
                />
            </S.DivSearch>
            <TextField
                select
                key="genre"
                name="genre"
                onChange={onChangeGenre}
                label="Gênero"
                value={selectedGenre || ""}
                style={ {width: "100px", marginBottom: "15px"}}
                onClick={() => dispatch(push(routes.searchMusic))}
            >
                <MenuItem value={undefined}>Selecione:</MenuItem>
                {allGenres.map(genre => 
                    <MenuItem key={genre.id} value={genre.id}>
                        {genre.name}
                    </MenuItem>)}
            </TextField>

        </>
    )
}

export default SearchContainer