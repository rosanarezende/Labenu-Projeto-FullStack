import React from "react"
import { useDispatch } from 'react-redux'
import { aproveBand
    // , getAllBands 
} from "../../actions"
import { ListItem, Avatar, ListItemAvatar, ListItemText, IconButton, ListItemSecondaryAction } from "@material-ui/core"
import { Check } from "@material-ui/icons"

function ListItemPersonalized(props) {
    const { band, color, toApprove } = props
    const newAvatar = band?.nickname.slice(0, 1).toUpperCase()
    const dispatch = useDispatch()

    const onApproveBand = (id) => {
        if(window.confirm("Deseja aprovar esse artista?")){
            dispatch(aproveBand(id))
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
                primary={band?.name}
                secondary={`${band?.nickname} - ${band?.email}`}
            />
            {toApprove &&
                <ListItemSecondaryAction onClick={() => onApproveBand(band.id)}>
                    <IconButton
                        edge="end"
                        aria-label="check"
                        color="primary"
                    >
                        <Check />
                    </IconButton>
                </ListItemSecondaryAction>
            }
        </ListItem>
    )

}

export default ListItemPersonalized