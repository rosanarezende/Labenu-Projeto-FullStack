import styled from "styled-components"
import { TextField, Typography } from "@material-ui/core"

export const GenresWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 3em auto;

    @media screen and (max-device-width: 1000px) {  
        width: 90%;
        margin: 1em auto;
    }
`

export const GenreForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;

    @media screen and (max-device-width: 1000px) {  
        /* justify-content: center; */
    }
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