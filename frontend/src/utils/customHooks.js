import { useState
    // , useEffect 

} from 'react';
// import { useDispatch } from 'react-redux'

// import { getLoggedUser } from '../actions';

export const useUser = () => {
    // const dispatch = useDispatch()
    const [userRole, setUserRole] = useState("ADMINISTRATOR")
    const [userName, setUserName] = useState("Cleiton")

    // useEffect(() => {
    //     const user = dispatch(getLoggedUser())
    //     setUserRole(user.role)
    //     setUserName(user.name)

    // }, [])

    return {
        userRole,
        userName
    }

}
