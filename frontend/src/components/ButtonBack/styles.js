import styled from "styled-components"

import { IconButton } from "@material-ui/core";

export const ButtonWrapper = styled(IconButton)`
    position: fixed;
    left: 20vw;
    top: 0.5rem;

    @media screen and (max-device-width: 1200px) {
        left: 0.5rem;
    }

`