import styled from "styled-components"
import { TextField, Typography } from "@material-ui/core"

export const GenreForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
`

export const GenreTitle = styled(Typography)`
    @media screen and (max-device-width: 1000px) {  
        margin-bottom: 10px;
    }
`

export const GenreIput = styled(TextField)`
    width: 50%;
    @media screen and (max-device-width: 1000px) {  
        width: 55vw;
    }
`