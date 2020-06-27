export const routes = {
    acess: "/",
    home: "/home",
    login: "/login",
    signup: "/signup",
    profile: "/profile",
    
    genres: "/genres",
    
    createAlbum: "/create/album",
    createMusic: "/create/music",
    
    approveBand: "/approveband",
    blockUser: "/user/block",
    premium: "/premium",

    searchMusic: "/search",
    musicDetail: "/music/:id",

    createPlaylist: "/create/playlist",
    myPlaylists: "/playlists/my",
    playlistDetail: "/playlist/:id",

}

export const baseUrl = "https://djl4tmngvb.execute-api.us-east-1.amazonaws.com/v1"

export const getToken = () => localStorage.getItem("token")

export const userName = localStorage.getItem("userName")

export const userRole = localStorage.getItem("userRole")