import React from "react"
import { useAllUsers } from "../../utils/customHooks"

import Appbar from "../../containers/Appbar"
import Message from "../../components/Message"
import Loading from "../../containers/Loading"
import ListItemPersonalized from "../../components/ListItemPersonalized"

import { Typography, List } from "@material-ui/core"
import * as S from "./styles"

function MakePremiumPage() {
    const allUsers = useAllUsers()
    const normalUsers = allUsers?.filter(user => user.role === "NON-PAYING-LISTENER")
    const premiumUsers = allUsers?.filter(user => user.role === "PAYING-LISTENER")

    return (
        <>
            <Appbar />
            <S.MakePremiumWrapper>
                <div>
                    <Typography variant="h6">
                        Não Pagantes
                    </Typography>
                    <List>
                        {normalUsers?.map(user =>
                            <ListItemPersonalized
                                user={user}
                                color="#f44336"
                                toMakePremium
                                key={user.id}
                            />
                        )}
                    </List>
                </div>
                <div>
                    <Typography variant="h6">
                        Premium
                    </Typography>
                    <List>
                        {premiumUsers?.map(user =>
                            <ListItemPersonalized
                                user={user}
                                color="rgba(30, 215, 96, 1)"
                                key={user.id}
                            />
                        )}
                    </List>
                </div>
            </S.MakePremiumWrapper>
            <Message />
            <Loading />
        </>
    )
}

export default MakePremiumPage