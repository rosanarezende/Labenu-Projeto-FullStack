import styled from "styled-components"
import { Typography } from "@material-ui/core"

export const PageTitle = styled(Typography)`
    margin-bottom: 2em;
    @media screen and (max-device-width: 1000px) {  
        margin-bottom: 1em;
    }
`