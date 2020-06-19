import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllBands } from "../actions"

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
