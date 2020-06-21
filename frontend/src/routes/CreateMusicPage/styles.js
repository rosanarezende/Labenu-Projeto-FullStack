import styled from "styled-components"
import { TextField, Typography, Button } from "@material-ui/core"

export const CreateMusicWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 3em auto;

    @media screen and (max-device-width: 1000px) {  
        width: 90%;
        margin: 2em auto;
    }
`

export const CreateMusicForm = styled.form`
    display: flex;
    flex-direction: column;
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