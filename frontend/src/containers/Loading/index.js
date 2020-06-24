import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setLoading } from "../../actions"

import { CircularProgress } from "@material-ui/core";
import { BackdropStyled } from './styles'


export default function Loading() {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.loadingReducer)

    const handleClose = () => { 
        dispatch(setLoading(false))
    };

    return (<BackdropStyled open={loading} onClick={handleClose}>
            <CircularProgress />
        </BackdropStyled>)
}