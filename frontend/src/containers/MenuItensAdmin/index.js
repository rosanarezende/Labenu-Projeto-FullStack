import React from "react"

import { routes } from "../../utils/constants"
import MenuItemPersonalized from "../../components/MenuItemPersonalized"


function MenuItensAdmin() {
    let badgeContentMocked1 = 1

    return (
        <>
            <MenuItemPersonalized
                badgeContent={badgeContentMocked1}
                text="APROVAR BANDA"
                path={routes.approveBand}
            />
            <MenuItemPersonalized
                text="CADASTRAR ADMINISTRADOR"
                path={routes.signup}
            />
            <MenuItemPersonalized
                text="GERENCIAR GÊNEROS"
                path={routes.genres}
            />
            <MenuItemPersonalized
                text="BLOQUEAR USUÁRIOS"
            // path={routes.}
            />
        </>
    )
}

export default MenuItensAdmin
