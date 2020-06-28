import React from "react"
import { useAllUsers } from "../../utils/customHooks"

import Appbar from "../../containers/Appbar"
import Loading from "../../containers/Loading"
import Message from "../../components/Message"
import ListItemPersonalized from "../../components/ListItemPersonalized"

import { Typography, List } from "@material-ui/core"
import * as S from "./styles"

function BlockUserPage() {
    const allUsers = useAllUsers()
    
    const unblockedUsers = allUsers?.filter(band => 
        band.isApproved === true && 
        (band.role === "PAYING-LISTENER" || 
        band.role === "NON-PAYING-LISTENER"))

    const blockedUsers = allUsers?.filter(band => 
        band.isApproved === false && 
        (band.role === "PAYING-LISTENER" || 
        band.role === "NON-PAYING-LISTENER"))
    
    const unblockedBands = allUsers?.filter(band => 
        band.isApproved === true && band.role === "BAND")

    const blockedBands = allUsers?.filter(band => 
        band.isApproved === false && band.role === "BAND")

    return (
        <>
            <Appbar />
            <S.BlockUserWrapper>
                <div>
                    <Typography variant="h6">
                        Ouvintes Bloqueados
                    </Typography>
                    <List>
                        {blockedUsers?.map(user =>
                            <ListItemPersonalized
                                user={user}
                                color="#f44336"
                                key={user.id}
                            />
                        )}
                    </List>
                </div>
                <div>
                    <Typography variant="h6">
                        Ouvintes Não Bloqueados
                    </Typography>
                    <List>
                        {unblockedUsers?.map(user =>
                            <ListItemPersonalized
                                user={user}
                                color="rgba(30, 215, 96, 1)"
                                toBlock
                                key={user.id}
                            />
                        )}
                    </List>
                </div>
                <div>
                    <Typography variant="h6">
                        Artistas Bloqueados
                    </Typography>
                    <List>
                        {blockedBands?.map(user =>
                            <ListItemPersonalized
                                user={user}
                                color="#f44336"
                                key={user.id}
                            />
                        )}
                    </List>
                </div>
                <div>
                    <Typography variant="h6">
                        Artistas Não Bloqueados
                    </Typography>
                    <List>
                        {unblockedBands?.map(user =>
                            <ListItemPersonalized
                                user={user}
                                color="rgba(30, 215, 96, 1)"
                                toBlock
                                key={user.id}
                            />
                        )}
                    </List>
                </div>
            </S.BlockUserWrapper>
            <Message />
            <Loading/>
        </>
    )
}

export default BlockUserPage