export const routes = {
    acess: "/",
    home: "/home",
    login: "/login",
    signup: "/signup",
    approveBand: "/approveband",
    genres: "/genres",
    profile: "/profile",
    createAlbum: "/create/album",
    createMusic: "/create/music",
    blockUser: "/user/block"
    
    // detail: '/produto/:id'
}

export const baseUrl = "http://localhost:3001"

export const getToken = () => localStorage.getItem("token")

export const userName = localStorage.getItem("userName")

export const userRole = localStorage.getItem("userRole")