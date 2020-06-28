import styled from "styled-components"
import { Button } from "@material-ui/core"

export const PageButton = styled(Button)`
    width: 30%;
    margin: 1em auto 0;
    @media screen and (max-device-width: 1000px) {  
        width: 100%;
        margin: 0 auto;
    }
`