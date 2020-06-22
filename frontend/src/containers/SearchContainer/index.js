import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { push } from 'connected-react-router'

import { useStyles } from "../../utils/theme";
import { useAllGenres } from "../../utils/customHooks"
import { routes } from "../../utils/constants"
import { setInputSearch, setGenreSelected } from "../../actions"

import { InputBase, TextField, MenuItem } from "@material-ui/core"
import { Search } from "@material-ui/icons"

function SearchContainer() {
    const dispatch = useDispatch()
    const classes = useStyles();
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
            <div className={classes.search} onClick={() => dispatch(push(routes.searchMusic))}>
                <div className={classes.searchIcon}>
                    <Search />
                </div>
                <InputBase
                    placeholder="Música..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={inputSearch}
                    onChange={onChangeInput}
                />
            </div>           

            <TextField
                select
                key="genre"
                name="genre"
                onChange={onChangeGenre}
                label="Gênero"
                value={selectedGenre || ""}
                style={ {width: "100px", marginBottom: "15px"}}
            >
                <MenuItem value="">Selecione:</MenuItem>
                {allGenres.map(genre => 
                    <MenuItem key={genre.id} value={genre.id}>
                        {genre.name}
                    </MenuItem>)}
            </TextField>

        </>
    )
}

export default SearchContainer