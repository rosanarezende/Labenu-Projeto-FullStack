import React, { forwardRef } from "react"
import { routes } from "../../utils/constants"

import { useAllBands } from "../../utils/customHooks"
import MenuItemPersonalized from "../../components/MenuItemPersonalized"


function MenuItensAdmin() {
    const allBands = useAllBands()
    const bandsNumber = allBands?.filter(band => band?.isApproved === false).length

    return (
        <>
            <MenuItemPersonalized
                text="CADASTRAR ADMIN"
                path={routes.signup}
            />
            <MenuItemPersonalized
                text="CADASTRAR GÊNERO"
                path={routes.genres}
            />
            <MenuItemPersonalized
                badgeContent={bandsNumber}
                text="APROVAR ARTISTA"
                path={routes.approveBand}
            />
            <MenuItemPersonalized
                text="BLOQUEAR USUÁRIO"
                path={routes.blockUser}
            />
            <MenuItemPersonalized
                text="TORNAR PREMIUM"
                path={routes.premium}
            />
        </>
    )
}

export default forwardRef(MenuItensAdmin)
