import styled from "styled-components"
import { TextField, Typography, Button } from "@material-ui/core"

export const CreateMusicForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem; 
`

export const CreateMusicTitle = styled(Typography)`
    margin-bottom: 2em;
    @media screen and (max-device-width: 1000px) {  
        margin-bottom: 1em;
    }
`

export const CreateMusicInput = styled(TextField)`
    width: 80%;
    margin: 0 auto 2em;
    @media screen and (max-device-width: 1000px) {  
        width: 100%;
    }
`

export const CreateMusicButton = styled(Button)`
    width: 30%;
    margin: 1em auto 0;
    @media screen and (max-device-width: 1000px) {  
        width: 100%;
        margin: 0 auto;
    }
`