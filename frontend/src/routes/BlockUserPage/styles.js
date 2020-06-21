import styled from "styled-components"

export const BlockUserWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 3em auto;

    @media screen and (max-device-width: 1200px) {
        justify-content: right;
        flex-wrap: wrap;
        width: 90%;
        margin: 1em auto;
    }
`