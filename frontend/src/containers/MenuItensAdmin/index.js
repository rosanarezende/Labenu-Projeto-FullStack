import React from "react"
import { routes } from "../../utils/constants"
import { useAllBands } from "../../utils/customHooks"
import MenuItemPersonalized from "../../components/MenuItemPersonalized"


function MenuItensAdmin() {
    const allBands = useAllBands()
    const bandsNumber = allBands?.filter(band => band?.isApproved === false).length
    
    return (
        <>
            <MenuItemPersonalized
                badgeContent={bandsNumber}
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