import styled from "styled-components"

export const HomeWrapper = styled.div`
    background-image: url("https://user-images.githubusercontent.com/45580434/84952632-a7008b80-b0c8-11ea-9baa-dde5c9eb89b8.jpg");
    background-color: #cccccc;
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    position: relative;
    height: 92vh;
`

export const Backdrop = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
`


export const HomeText = styled.div`
    text-align: center;
    position: absolute;
    top: 35%;
    left: 70%;
    transform: translate(-50%, -50%);
    font-size: 5em;
    z-index: 2;

    @media screen and (max-device-width: 1200px){
        top: 40%;
        font-size: 1.5em;
    }
`