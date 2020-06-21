import React from "react"
import { routes } from "../../utils/constants"
import { useSelector } from 'react-redux'

// import { useAllBands } from "../../utils/customHooks"
import MenuItemPersonalized from "../../components/MenuItemPersonalized"


function MenuItensAdmin() {
    // const allBands = useAllBands()
    
    const allBands = useSelector(state => state.genres.allBands)
    const bandsNumber = allBands?.filter(band => band?.isApproved === false).length

    return (
        <>
            <MenuItemPersonalized
                text="CADASTRAR ADMINISTRADOR"
                path={routes.signup}
            />
            <MenuItemPersonalized
                text="GERENCIAR GÊNEROS"
                path={routes.genres}
            />
            <MenuItemPersonalized
                badgeContent={bandsNumber}
                text="APROVAR BANDA"
                path={routes.approveBand}
            />
            <MenuItemPersonalized
                text="BLOQUEAR USUÁRIOS"
                path={routes.blockUser}
            />
        </>
    )
}

export default MenuItensAdmin
