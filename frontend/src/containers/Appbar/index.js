import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { AppBar, Toolbar } from "@material-ui/core"
import { routes } from "../../utils/constants"
import * as S from "./styles"

function Appbar() {
    const dispatch = useDispatch()
    const goToHome = push(routes.home)

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <S.Logo
                    src="https://user-images.githubusercontent.com/45580434/84555007-12291700-acf1-11ea-9b01-91d7f94f0755.png"
                    alt="logo"
                    onClick={() => dispatch(goToHome)}
                />
            </Toolbar>
        </AppBar>
    )
}

export default Appbar
