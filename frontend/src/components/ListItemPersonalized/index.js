import React from "react"
import { useDispatch } from 'react-redux'
import { aproveBand, blockUser } from "../../actions"
import { ListItem, Avatar, ListItemAvatar, ListItemText, IconButton, ListItemSecondaryAction } from "@material-ui/core"
import { Check, Block } from "@material-ui/icons"

function ListItemPersonalized(props) {
    const dispatch = useDispatch()
    const { user, color, toApprove, toBlock } = props
    const newAvatar = user?.nickname.slice(0, 1).toUpperCase()

    const onClickFunction = (id) => {
        if(toApprove){
            if(window.confirm("Deseja aprovar esse artista?")){
                dispatch(aproveBand(id))
            }
        }
        if(toBlock){
            if(window.confirm("Deseja bloquear esse usuário?")){
                dispatch(blockUser(id))
            }
        }
    }

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar style={{ backgroundColor: color }}>
                    {newAvatar}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={user?.name}
                secondary={`${user?.nickname} - ${user?.email}`}
            />
            {(toApprove || toBlock) &&
                <ListItemSecondaryAction onClick={() => onClickFunction(user.id)}>
                    <IconButton edge="end" aria-label="icon" 
                        color={toApprove ? "primary" : "inherit"}
                    >
                        {toApprove && <Check />}
                        {toBlock && <Block/>}
                    </IconButton>
                </ListItemSecondaryAction>
            }
        </ListItem>
    )

}

export default ListItemPersonalized