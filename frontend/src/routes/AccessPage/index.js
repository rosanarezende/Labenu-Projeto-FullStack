import React
// , { useEffect } 
from 'react'
import { Container, Typography } from '@material-ui/core'
// import { useDispatch } from 'react-redux'
// import { push } from 'connected-react-router'
// import { routes } from "../../utils/constants"

function AccessPage() {
    // const dispatch = useDispatch()
    // const goToHome = push(routes.home)
    // const goToLogin = push(routes.login)

    // useEffect(() => {
    //     const token = window.localStorage.getItem('token')
    //     if(token){
    //         const timer = setTimeout(() => {
    //             dispatch(goToHome)
    //         }, 1000)
    //         return () => clearTimeout(timer)
    //     }
    //     else {
    //         const timer = setTimeout(() => {
    //             dispatch(goToLogin)
    //         }, 1000)
    //         return () => clearTimeout(timer)
    //     }

    // }, [dispatch, goToHome, goToLogin])

    return (
        <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
      </Container>
    )
}

export default AccessPage
