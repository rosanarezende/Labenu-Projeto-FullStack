import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { AppBar, Toolbar, Typography} from "@material-ui/core"
import { routes } from "../../utils/constants"

function Appbar() {
    const dispatch = useDispatch()
    const goToHome = push(routes.home)

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography 
                    variant="h5" 
                    color="inherit" 
                    onClick={() => dispatch(goToHome)}
                    style={ { cursor: "pointer" }}
                >
                    <img src="https://user-images.githubusercontent.com/45580434/84555007-12291700-acf1-11ea-9b01-91d7f94f0755.png" alt="logo"/>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar
