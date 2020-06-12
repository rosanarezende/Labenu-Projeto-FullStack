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
                    Spotenu
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar
