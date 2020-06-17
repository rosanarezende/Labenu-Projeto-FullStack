import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { routes } from "../../utils/constants"
import { useStyles } from "../../utils/theme"
import { useUser } from '../../utils/personalizedHooks'

import * as S from "./styles"
import { AppBar, Toolbar, IconButton } from "@material-ui/core"
import { AccountCircle, MoreVert } from "@material-ui/icons"

import { MenuItensAdmin } from '../MenuItensAdmin'
import MenuPC from '../MenuPC'
import MenuMobile from '../MenuMobile'

function Appbar(props) {
    const { search } = props
    const { userRole } = useUser()
    const classes = useStyles();
    const dispatch = useDispatch()
    const goToHome = push(routes.home)
    // const goToLogin = push(routes.login)
    // const goToProfile = push(routes.profile)

    let buttons = undefined
    switch (userRole) {
        case "ADMINISTRATOR":
            buttons = <MenuItensAdmin />
            break;

        case "BAND":
            buttons = <div></div>
            break;

        case "PAYING-LISTENER":
            buttons = <div></div>
            break;

        default:
            break;
    }

    const [anchorEl, setAnchorEl] = useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';

    const renderMenu = <MenuPC
        menuId={menuId}
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
    />;

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = <MenuMobile
        buttons={buttons}
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
    />

    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <S.Logo
                        src="https://user-images.githubusercontent.com/45580434/84555007-12291700-acf1-11ea-9b01-91d7f94f0755.png"
                        alt="logo"
                        onClick={() => dispatch(goToHome)}
                    />
                    <S.DivGrow />
                    {search && // campo de pesquisa + select gênero
                        <div>

                        </div>
                    }
                    <S.DivGrow />
                    <div className={classes.sectionDesktop}>
                        {buttons}
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>

                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreVert />
                        </IconButton>
                    </div>

                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
        </div>
    )
}

export default Appbar
