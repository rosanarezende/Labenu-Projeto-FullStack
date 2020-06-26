import styled from "styled-components"
import { TextField, Typography, Button } from "@material-ui/core"

export const MyPlaylistsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 3em auto;

    @media screen and (max-device-width: 1000px) {  
        width: 90%;
        margin: 2em auto;
    }
`

export const MyPlaylistsForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem; 
`

export const MyPlaylistsTitle = styled(Typography)`
    margin-bottom: 2em;
    @media screen and (max-device-width: 1000px) {  
        margin-bottom: 1em;
    }
`

export const MyPlaylistsInput = styled(TextField)`
    width: 80%;
    margin: 0 auto 2em;
    @media screen and (max-device-width: 1000px) {  
        width: 100%;
    }
`

export const MyPlaylistsButton = styled(Button)`
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