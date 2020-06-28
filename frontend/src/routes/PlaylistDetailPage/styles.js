import styled from "styled-components"
import { TextField, Typography, Button } from "@material-ui/core"

export const PlaylistDetailForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem; 
`

export const PlaylistDetailTitle = styled(Typography)`
    margin-bottom: 1em;
    @media screen and (max-device-width: 1000px) {  
        margin-bottom: 1em;
    }
`

export const PlaylistDetailInput = styled(TextField)`
    width: 80%;
    margin: 0 auto 2em;
    @media screen and (max-device-width: 1000px) {  
        width: 100%;
    }
`

export const PlaylistDetailButton = styled(Button)`
    width: 30%;
    margin: 1em auto 0;
    @media screen and (max-device-width: 1000px) {  
        width: 100%;
        margin: 0 auto;
    }
`

export const SecretMessage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`