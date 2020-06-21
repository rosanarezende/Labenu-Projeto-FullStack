import styled from "styled-components"

export const BandsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 50%;
    margin: 3em auto;

    @media screen and (max-device-width: 1000px) {
        justify-content: right;
        flex-wrap: wrap;
        width: 90%;
        margin: 1em auto;
    }
`