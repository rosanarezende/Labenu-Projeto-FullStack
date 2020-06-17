import React from "react"

// import { routes } from "../../utils/constants"
import MenuItemPersonalized from "../../components/MenuItemPersonalized"


function MenuItensPayingListener() {

    return (
        <>
            <MenuItemPersonalized
                text="CRIAR PLAYLIST"
                // path={routes.album}
            />
            <MenuItemPersonalized
                text="MINHAS PLAYLIST"
                // path={routes.music}
            />
        </>
    )
}

export default MenuItensPayingListener
