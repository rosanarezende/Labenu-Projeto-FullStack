import styled from "styled-components"
import { TextField, Typography, FormControl, InputLabel, Button } from "@material-ui/core"

export const CreateAlbumWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 3em auto;

    @media screen and (max-device-width: 1000px) {  
        width: 90%;
        margin: 2em auto;
    }
`

export const CreateAlbumForm = styled.form`
    display: flex;
    flex-direction: column;
`

export const CreateAlbumTitle = styled(Typography)`
    margin-bottom: 2em;
    @media screen and (max-device-width: 1000px) {  
        margin-bottom: 1em;
    }
`

export const CreateAlbumInput = styled(TextField)`
    width: 80%;
    margin: 0 auto 2em;
    @media screen and (max-device-width: 1000px) {  
        width: 100%;
    }
`

export const CreateAlbumFormControl = styled(FormControl)`
    width: 80%;
    margin: 0 auto 2em;
    @media screen and (max-device-width: 1000px) {  
        width: 100%;
    }
`

export const CreateAlbumInputLabel = styled(InputLabel)`
    background-color: #fafafa;
    padding: 0 5px;
    margin-left: -5px;
`

export const CreateAlbumButton = styled(Button)`
    width: 30%;
    margin: 1em auto 0;
    @media screen and (max-device-width: 1000px) {  
        width: 100%;
        margin: 0 auto;
    }
`