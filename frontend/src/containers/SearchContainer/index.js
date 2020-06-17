import React, {useState} from "react"

import { useStyles } from "../../utils/theme";

import { InputBase, TextField, MenuItem } from "@material-ui/core"
import { Search } from "@material-ui/icons"

function SearchContainer() {
    const classes = useStyles();
    const [selectedGenre, setSelectedGenre ] = useState("")

    const genres = ["JAZZ", "FORRÓ"]

    const onChangeGenre = (event) => {
        setSelectedGenre(event.target.value)
    }
    console.log(selectedGenre)
    return (
        <>
            <div className={classes.search}>
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
                <MenuItem value=""></MenuItem>
                {genres.map(genre => 
                    <MenuItem key={genre} value={genre}>
                        {genre}
                    </MenuItem>)}
            </TextField>

        </>
    )
}

export default SearchContainer