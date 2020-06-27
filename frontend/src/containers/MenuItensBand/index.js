import React, { forwardRef } from "react"

import { routes } from "../../utils/constants"
import MenuItemPersonalized from "../../components/MenuItemPersonalized"

function MenuItensBand() {

    return (
        <>
            <MenuItemPersonalized
                text="GERENCIAR ÁLBUNS"
                path={routes.createAlbum}
            />
            <MenuItemPersonalized
                text="GERENCIAR MÚSICAS"
                path={routes.createMusic}
            />
        </>
    )
}

export default forwardRef(MenuItensBand)