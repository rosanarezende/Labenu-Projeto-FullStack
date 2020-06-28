import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { routes } from "../../utils/constants"

import { InputAdornment } from '@material-ui/core';
import * as S from "./styles"

import { login } from '../../actions/users';
import Message from '../../components/Message';
import Loading from '../../containers/Loading';

function LoginPage() {
    const [userInfo, setUserInfo] = useState({})
    const [hidenPassword, setHidenPassword] = useState(false)
    const open = useSelector(state => state.messages.open)
    const dispatch = useDispatch()

    function goToSignUp() {
        dispatch(push(routes.signup))
    }

    function getUserInfo(e) {
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
    }

    function sendUserInfo(e) {
        e.preventDefault()
        dispatch(login(userInfo))
    }

    return (
        <>
        <S.LoginWrapper>
            <S.LoginLogo src="https://user-images.githubusercontent.com/45580434/84555007-12291700-acf1-11ea-9b01-91d7f94f0755.png" alt="logo" />

            <S.Text variant="h6" color="textSecondary"> Entrar </S.Text>

            <S.LoginForm onSubmit={sendUserInfo}>

                <S.InputWrapper
                    name='input'
                    variant="outlined"
                    label="Email ou Nickname"
                    placeholder='email ou nickname'
                    type='text'
                    value={userInfo.input || ''}
                    onChange={getUserInfo}
                    required
                />

                <S.InputWrapper
                    name='password'
                    variant="outlined"
                    label="Senha"
                    placeholder='senha'
                    type={hidenPassword ? 'text' : 'password'}
                    value={userInfo.password || ''}
                    onChange={getUserInfo}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <img
                                    onClick={() => setHidenPassword(!hidenPassword)}
                                    src={hidenPassword
                                        ? "https://user-images.githubusercontent.com/45580434/84558424-2842d180-ad09-11ea-8377-cc34a14d02df.png"
                                        : "https://user-images.githubusercontent.com/45580434/84558461-60e2ab00-ad09-11ea-9c26-aec40d92e425.png"
                                    }
                                    alt="password"
                                />
                            </InputAdornment>
                        ),
                        inputProps: {
                            pattern: '.{6,}',
                            title: 'A senha deve ter no mínimo 6 caracteres'
                        }
                    }}
                />

                <S.ButtonWrapper type='onSubmit' variant="contained" color="primary">
                    Entrar
                </S.ButtonWrapper>

            </S.LoginForm>

            <S.GoSignupDiv>
                <S.GoSignupText>Não possui cadastro? </S.GoSignupText>
                <S.Link onClick={goToSignUp} color="primary">Clique aqui</S.Link>
            </S.GoSignupDiv>

        </S.LoginWrapper>
        <Loading/>
        {open && <Message/>}
        </>
    )
}

export default LoginPage
