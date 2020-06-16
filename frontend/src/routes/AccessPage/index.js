import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import * as S from "./styles"
import { routes } from "../../utils/constants"

function AccessPage() {
    const dispatch = useDispatch()
    const goToHome = push(routes.home)
    const goToLogin = push(routes.login)

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if(token){
            const timer = setTimeout(() => {
                dispatch(goToHome)
            }, 1000)
            return () => clearTimeout(timer)
        }
        else {
            const timer = setTimeout(() => {
                dispatch(goToLogin)
            }, 1000)
            return () => clearTimeout(timer)
        }

    }, [dispatch, goToHome, goToLogin])

    return (
      <S.AcessWrapper>
        <S.AcessLogo src="https://user-images.githubusercontent.com/45580434/84555007-12291700-acf1-11ea-9b01-91d7f94f0755.png" alt="logo"/>
      </S.AcessWrapper>
    )
}

export default AccessPage
