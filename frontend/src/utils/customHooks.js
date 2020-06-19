import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux'

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
