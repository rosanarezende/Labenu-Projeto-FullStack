import styled from "styled-components"
import { TextField, FormControl, InputLabel, Button } from "@material-ui/core"

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