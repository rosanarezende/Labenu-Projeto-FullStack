import styled from "styled-components"
import {Typography, TextField, Button} from '@material-ui/core'

export const SignupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const SignupLogo = styled.img`
    width: 200px;
    margin: 32px 0;
`

export const MarginTop = styled.div`
    margin-top: 32px;
`

export const SignupForm = styled.form`
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

export const TextAreaWrapper = styled(TextField)`
    width: 100%;
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