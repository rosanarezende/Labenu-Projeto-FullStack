import React from "react"
import { useDispatch, useSelector } from 'react-redux'

import { setOpen } from '../../actions';

import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Message() {
    const { open, text, color } = useSelector(state => state.messages)
    const dispatch = useDispatch()
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setOpen(false));
    };

    return (
        <Snackbar open={open} autoHideDuration={color === "red" ? 3000 : 4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={color === "red" ? "error" : "success"}>
                {text}
            </Alert>
        </Snackbar>
    )
}

export default Message