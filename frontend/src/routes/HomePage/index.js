import React from 'react'
import Appbar from '../../containers/Appbar'
import { useUser } from '../../utils/customHooks'
import * as S from "./style"

function HomePage() {
    const { userName } = useUser()

    return (
        <>
            <Appbar />
            <S.HomeWrapper>
                <p data-attribution="Créditos da imagem de fundo: https://pixabay.com/photos/girl-music-fashion-listen-1990347/"></p>
                <S.HomeText>
                    <span>Bem vindx <strong style={{ color: "#fff" }}>{userName}</strong></span>
                </S.HomeText>
                <S.Backdrop/>
            </S.HomeWrapper>
        </>
    )
}

export default HomePage
