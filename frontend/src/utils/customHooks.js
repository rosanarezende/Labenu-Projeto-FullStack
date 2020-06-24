import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { 
    getAllBands, 
    getAllGenres, 
    getBandAlbuns, 
    getAllUsers, 
    getProfile, 
    setProfile, 
    getAllMusics,
    getMusicsList,
    getMusicsByGenre,
    setLoading,
    getCountMusicsByGenre,
    getCountMusicsList,
    getMyMusics
} from "../actions"

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
        dispatch(setLoading(true))
        dispatch(getAllBands())
    }, [dispatch])
    dispatch(setLoading(false))
    return allBands
}

export const useAllGenres = () => {
    const { allGenres } = useSelector(state => state.genres)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(getAllGenres())
    }, [dispatch])
    dispatch(setLoading(false))
    
    return allGenres
}

export const useBandAlbuns = () => {
    const { bandAlbuns } = useSelector(state => state.albuns)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(getBandAlbuns())
    }, [dispatch])
    dispatch(setLoading(false))

    return bandAlbuns
}

export const useAllUsers = () => {
    const { allUsers } = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(getAllUsers())
    }, [dispatch])
    dispatch(setLoading(false))

    return allUsers
}

export const useProfile = () => {
    const { profile } = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(setProfile({}))
        dispatch(getProfile())
    }, [dispatch])
    dispatch(setLoading(false))

    return profile
}

export const useAllMusics = () => {
    const { allMusics } = useSelector(state => state.musics)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(getAllMusics())
    }, [dispatch])
    dispatch(setLoading(false))

    return allMusics
}

export const useMusicsList = (num) => {
    const { musicsList, numMusicsList } = useSelector(state => state.musics)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(getMusicsList(num))
        dispatch(getCountMusicsList())
    }, [dispatch, num])
    dispatch(setLoading(false))

    return {musicsList, numMusicsList}
}

export const useMusicsByGenre = (genreId, num) => {
    const { musicsByGenre, numMusicsByGenre } = useSelector(state => state.musics)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(getMusicsByGenre(genreId, num))
        dispatch(getCountMusicsByGenre(genreId))
    }, [dispatch, genreId, num])
    dispatch(setLoading(false))

    return { musicsByGenre, numMusicsByGenre }
}

export const useMyMusics = () => {
    const { myMusics } = useSelector(state => state.musics)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(getMyMusics())
    }, [dispatch])
    dispatch(setLoading(false))

    return myMusics
}