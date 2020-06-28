import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { getAllMusics, getMusicsList, getMyMusics, getMusicsByGenre, getCountMusicsByGenre, getCountMusicsList } from "../actions/musics"
import { getBandAlbuns } from "../actions/albuns"
import { getAllGenres } from "../actions/genres"
import { getAllBands, getAllUsers, getProfile, setProfile } from "../actions/users"
import { getMyPlaylists, getPlaylistDetail, getCountPlaylistDetail } from "../actions/playlists"

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
    const dispatch = useDispatch()
    const { allBands } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getAllBands())
    }, [dispatch])

    return allBands
}

export const useAllGenres = () => {
    const dispatch = useDispatch()
    const { allGenres } = useSelector(state => state.genres)
    
    useEffect(() => {
        dispatch(getAllGenres())
    }, [dispatch])
    
    return allGenres
}

export const useBandAlbuns = () => {
    const dispatch = useDispatch()
    const { bandAlbuns } = useSelector(state => state.albuns)

    useEffect(() => {
        dispatch(getBandAlbuns())
    }, [dispatch])

    return bandAlbuns
}

export const useAllUsers = () => {
    const dispatch = useDispatch()
    const { allUsers } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return allUsers
}

export const useProfile = () => {
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(setProfile({}))
        dispatch(getProfile())
    }, [dispatch])

    return profile
}

export const useAllMusics = () => {
    const dispatch = useDispatch()
    const { allMusics } = useSelector(state => state.musics)
    
    useEffect(() => {
        dispatch(getAllMusics())
    }, [dispatch])

    return allMusics
}

export const useMusicsList = (num) => {
    const dispatch = useDispatch()
    const { musicsList, numMusicsList } = useSelector(state => state.musics)
    
    useEffect(() => {
        dispatch(getMusicsList(num))
        dispatch(getCountMusicsList())
    }, [dispatch, num])

    return {musicsList, numMusicsList}
}

export const useMusicsByGenre = (genreId, num) => {
    const dispatch = useDispatch()
    const { musicsByGenre, numMusicsByGenre } = useSelector(state => state.musics)
    
    useEffect(() => {
        dispatch(getMusicsByGenre(genreId, num))
        dispatch(getCountMusicsByGenre(genreId))
    }, [dispatch, genreId, num])

    return { musicsByGenre, numMusicsByGenre }
}

export const useMyMusics = () => {
    const dispatch = useDispatch()
    const { myMusics } = useSelector(state => state.musics)

    useEffect(() => {
        dispatch(getMyMusics())
    }, [dispatch])

    return myMusics
}

export const useMyPlaylists = () => {
    const dispatch = useDispatch()
    const { myPlaylists } = useSelector(state => state.playlists)
    
    useEffect(() => {
        dispatch(getMyPlaylists()) 
    }, [dispatch])

    return myPlaylists
}

export const usePlaylistDetail = (num) => {
    const dispatch = useDispatch()
    const { playlistDetail } = useSelector(state => state.playlists)
    let playlistSelected = useSelector(state => state.playlists.playlistSelected)
    let { numPlaylistDetail } = useSelector(state => state.playlists)

    useEffect((playlistSelected) => {
        if(playlistSelected?.id === undefined){
            playlistSelected = { id: window.location.pathname.substr(10, 36) }
        }
        dispatch(getPlaylistDetail(playlistSelected?.id, num)) 
        dispatch(getCountPlaylistDetail(playlistSelected?.id))
    }, [dispatch, playlistSelected, num])

    return { playlistDetail, numPlaylistDetail }
}