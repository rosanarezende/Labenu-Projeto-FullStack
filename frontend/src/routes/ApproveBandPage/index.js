import React from "react"
import { useAllBands } from "../../utils/customHooks"

import Appbar from '../../containers/Appbar'
import ListItemPersonalized from "../../components/ListItemPersonalized"
import Message from "../../components/Message"

import { Typography, List } from "@material-ui/core"
import * as S from "./styles"

function ApproveBandPage() {
    const allBands = useAllBands()
    const approvedBands = allBands?.filter(band => band.isApproved === true)
    const notApprovedBands = allBands?.filter(band => band.isApproved === false)

    return (
        <>
            <Appbar />
            <S.BandsWrapper>
                <div>
                    <Typography variant="h6">
                        Aprovadas
                    </Typography>
                    <List>
                        {approvedBands?.map(band =>
                            <ListItemPersonalized
                                user={band}
                                color="rgba(30, 215, 96, 1)"
                                key={band.id}
                            />
                        )}
                    </List>
                </div>
                <div>
                    <Typography variant="h6">
                        Não Aprovadas
                    </Typography>
                    <List>
                        {notApprovedBands?.map(band =>
                            <ListItemPersonalized
                                user={band}
                                color="#f44336"
                                toApprove
                                key={band.id}
                            />
                        )}
                    </List>
                </div>
            </S.BandsWrapper>
            <Message />
        </>
    )
}

export default ApproveBandPage