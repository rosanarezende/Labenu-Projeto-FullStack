import React from "react"

// import { routes } from "../../utils/constants"
import MenuItemPersonalized from "../../components/MenuItemPersonalized"


function MenuItensBand() {

    return (
        <>
            <MenuItemPersonalized
                text="GERENCIAR ÁLBUNS"
                // path={routes.album}
            />
            <MenuItemPersonalized
                text="GERENCIAR MÚSICAS"
                // path={routes.music}
            />
        </>
    )
}

export default MenuItensBand
