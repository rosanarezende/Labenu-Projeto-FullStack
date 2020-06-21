import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllBands, getAllGenres, getBandAlbuns, getAllUsers, getProfile } from "../actions"

export const useUser = () => {
    const [userRole, setUserRole] = useState("")
    const [userName, setUserName] = useState("")

    useEffect(() => {
        const role = localStorage.getItem("userRole")
        const name = localStorage.getItem("userName")
        setUserRole(role)
        setUserName(name)
    }, [userRole, userName])

    return {
        userRole,
        userName
    }

}

export const useAllBands = () => {
    const { allBands } = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBands())
    }, [dispatch])

    return allBands
}

export const useAllGenres = () => {
    const { allGenres } = useSelector(state => state.genres)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllGenres())
    }, [dispatch])

    return allGenres
}

export const useBandAlbuns = () => {
    const { bandAlbuns } = useSelector(state => state.albuns)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBandAlbuns())
    }, [dispatch])

    return bandAlbuns
}

export const useAllUsers = () => {
    const { allUsers } = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return allUsers
}

export const useProfile = () => {
    const { profile } = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    return profile
}