import styled from "styled-components"
import { Typography } from "@material-ui/core"

export const ProfileWrapper = styled.form`
    display: flex;
    flex-direction: column;
    width: 50vw;
    margin: 3rem auto;
    /* justify-content: center; */

    @media screen and (max-device-width: 1200px) {
        width: 80vw;
        margin: 2rem auto;
    }
`

export const ProfileTitle = styled(Typography)`
    margin-bottom: 2em;
    @media screen and (max-device-width: 1000px) {  
        margin-bottom: 1em;
    }
`
