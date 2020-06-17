import React from "react"
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { IconButton, MenuItem, Badge } from "@material-ui/core"
import { Notifications } from "@material-ui/icons"

function MenuItemPersonalized(props) {
    const { badgeContent, text, path } = props
    const dispatch = useDispatch()

    return (
        <MenuItem onClick={() => dispatch(push(path))}>
            <IconButton color="inherit">
                {badgeContent > 0
                    ?
                    <Badge badgeContent={badgeContent} color="secondary">
                        <Notifications />
                    </Badge>
                    :
                    badgeContent && <Notifications />
                }
            </IconButton>
            <p>{text}</p>
        </MenuItem>
    )
}

export default MenuItemPersonalized