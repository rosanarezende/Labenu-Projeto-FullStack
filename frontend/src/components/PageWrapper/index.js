import styled from "styled-components"

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 3em auto;

    @media screen and (max-device-width: 1000px) {  
        width: 90%;
        margin: 2em auto;
    }
`