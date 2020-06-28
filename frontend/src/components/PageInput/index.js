import styled from "styled-components"
import { TextField } from "@material-ui/core"

export const PageInput = styled(TextField)`
    width: 80%;
    margin: 0 auto 2em;
    @media screen and (max-device-width: 1000px) {  
        width: 100%;
    }
`