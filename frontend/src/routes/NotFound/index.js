import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from "../../utils/constants"

import * as S from "./styles"

function NotFound() {
    const dispatch = useDispatch()
    const goToHome = push(routes.home)

    return (
        <S.NFWrapper>
            <h3>Página não encontrada</h3>
            <S.NFLink onClick={() => dispatch(goToHome)}>
                <i className="fa fa-arrow-left" aria-hidden="true"/> Voltar para Home
            </S.NFLink>
        </S.NFWrapper>
    )
}

export default NotFound