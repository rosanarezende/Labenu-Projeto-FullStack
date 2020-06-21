import React from "react"
// import { useDispatch } from 'react-redux'
import { useAllBands } from "../../utils/customHooks"
import Appbar from '../../containers/Appbar'
import ListItemPersonalized from "../../components/ListItemPersonalized"
import * as S from "./styles"
import { Typography, List } from "@material-ui/core"
import Message from "../../components/Message"

function ApproveBandPage() {
    const allBands = useAllBands()
    // const dispatch = useDispatch()
    const approvedBands = allBands?.filter(band => band.isApproved === true)
    const notApprovedBands = allBands?.filter(band => band.isApproved === false)
    
    return (
        <>
            <Appbar />
            <S.BandsWrapper>

                <div>
                    <Typography variant="h6">
                        Não Aprovadas
                    </Typography>
                    <List>
                        {notApprovedBands?.map(band =>
                            <ListItemPersonalized
                                band={band}
                                color="#f44336"
                                toApprove
                                key={band.id}
                            />
                        )}
                    </List>
                </div>

                <div>
                    <Typography variant="h6">
                        Aprovadas
                    </Typography>
                    <List>
                        {approvedBands?.map(band =>
                            <ListItemPersonalized 
                                band={band} 
                                color="rgba(30, 215, 96, 1)"
                                key={band.id}
                            />
                        )}
                    </List>
                </div>

            </S.BandsWrapper>
            <Message/>
        </>
    )
}

export default ApproveBandPage