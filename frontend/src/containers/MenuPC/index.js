import React, { forwardRef } from "react"
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { routes } from "../../utils/constants"

import { Menu, MenuItem } from "@material-ui/core"


function MenuPC(props, ref){
    const dispatch = useDispatch()
    const { menuId, anchorEl, isMenuOpen, handleMenuClose } = props
    const goToLogin = push(routes.login)
    const goToProfile = push(routes.profile)

    const logout = () => {
        localStorage.clear()
        dispatch(goToLogin)
    }

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => dispatch(goToProfile)}>Perfil</MenuItem>
            <MenuItem onClick={logout}>Sair</MenuItem>
        </Menu>
    )
}

export default forwardRef(MenuPC)