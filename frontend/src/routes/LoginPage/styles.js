import styled from "styled-components"
import {Typography, TextField, Button} from '@material-ui/core'

export const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`

export const LoginLogo = styled.img`
    width: 200px;
    margin-bottom: 32px;
`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 50vw;
    justify-content: center;

    @media screen and (max-device-width: 1200px) {
        width: 80vw;
    }
`

export const InputWrapper = styled(TextField)`
    width: 100%;
    height: 56px;
    margin: 8px auto;
`

export const ButtonWrapper = styled(Button)`
    width: 100%;
    height: 42px;
    border-radius: 2px;
    margin: 16px auto 32px;
`

export const Text = styled(Typography)`
    margin-bottom: 16px;
`

export const GoSignupDiv = styled.div`
    display: flex;
    align-items: center;
`

export const GoSignupText = styled(Typography)``

export const Link = styled(Button)`
    margin-left: 6px;
`