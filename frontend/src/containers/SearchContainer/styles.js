import styled from "styled-components"
import {InputBase} from "@material-ui/core"

export const DivSearch = styled.div`
  position: relative;
  border-radius: 5px;
  margin-right: 20px;
  background-color: rgba(225,225,225, 0.15);
  :hover {
    background-color: rgba(225,225,225, 0.25);
  }
  width: auto;
  @media screen and (max-width: 1200px){
    width: 40%;
    margin-right: 10px;
  }
`
export const DivSearchIcons = styled.div`
  position: absolute;
  padding: 5px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`

export const InputBaseStyled = styled(InputBase)`
  color: inherit;
  width: 100%;
  padding-left: 35px;
`