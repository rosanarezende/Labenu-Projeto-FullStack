import React from 'react'
import { AppBar, Toolbar, Typography} from "@material-ui/core"

function Appbar() {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h5" color="inherit">
                    Spotenu
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar
