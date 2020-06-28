import React, { forwardRef } from "react"

import { routes } from "../../utils/constants"
import MenuItemPersonalized from "../../components/MenuItemPersonalized"


function MenuItensPayingListener() {

    return (
        <>
            <MenuItemPersonalized
                text="CRIAR PLAYLISTS"
                path={routes.createPlaylist}
            />
            <MenuItemPersonalized
                text="MINHAS PLAYLIST"
                path={routes.myPlaylists}
            />
        </>
    )
}

export default forwardRef(MenuItensPayingListener)
