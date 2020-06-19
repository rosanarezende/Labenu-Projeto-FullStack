import styled from "styled-components"
import { Toolbar } from "@material-ui/core"

export const ToolBarStyled = styled(Toolbar)`

    @media screen and (max-device-width: 1200px){
        padding: 0 5px;
    }
`

export const Logo = styled.img`
    height: 50px;
    width: auto;
    cursor: pointer;
    margin: 10px 10px 10px 0;

    @media screen and (max-device-width: 1200px){
        height: 30px;
        margin: 5px 5px 5px 0;
    }
`

export const DivGrow = styled.div`
    display: flex;
    flex-grow: 1;
`