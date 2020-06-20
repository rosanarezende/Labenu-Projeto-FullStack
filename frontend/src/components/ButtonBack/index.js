import React from "react"
import { goBack } from 'connected-react-router';
import { useDispatch } from 'react-redux'

import * as S from "./styles"
import { ArrowBack } from "@material-ui/icons"

function ButtonBack(){
    const dispatch = useDispatch()

    return (
        <S.ButtonWrapper onClick={() => dispatch(goBack())}>
            <ArrowBack/>
        </S.ButtonWrapper>
    )
}

export default ButtonBack
