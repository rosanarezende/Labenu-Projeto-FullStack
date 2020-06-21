import React from 'react'
import Appbar from '../../containers/Appbar'
import { useUser } from '../../utils/customHooks'
import * as S from "./style"

function HomePage() {
    // const profile = useProfile()
    const { userRole } = useUser()

    return (
        <>
            <Appbar />
            <S.HomeWrapper>
                <S.HomeText>
                    <span>Bem vindx <strong style={{ color: "#fff" }}>{userRole}</strong></span>
                </S.HomeText>
                <S.Backdrop/>
            </S.HomeWrapper>
        </>
    )
}

export default HomePage
