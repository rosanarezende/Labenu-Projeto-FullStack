import React from "react"
import { Menu, MenuItem, IconButton } from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"
import { useUser } from '../../utils/customHooks'

function MenuMobile(props) {
    const {
        buttons,
        mobileMenuId,
        mobileMoreAnchorEl,
        isMobileMenuOpen,
        handleProfileMenuOpen,
        handleMobileMenuClose
    } = props
    const { userName } = useUser()

    return (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {buttons}

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>{userName}</p>
            </MenuItem>
        </Menu>
    )
}

export default MenuMobile