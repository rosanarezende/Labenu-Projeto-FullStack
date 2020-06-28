import styled from "styled-components"
import { TextField, Button } from "@material-ui/core"

export const CreatePlaylistInput = styled(TextField)`
    width: 80%;
    margin: 0 auto 2em;
    @media screen and (max-device-width: 1000px) {  
        width: 100%;
    }
`

export const CreatePlaylistButton = styled(Button)`
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