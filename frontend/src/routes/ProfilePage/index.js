import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { useProfile } from "../../utils/customHooks"
import { changeName } from "../../actions/users"

import Appbar from "../../containers/Appbar"
import Message from "../../components/Message"
import Loading from "../../containers/Loading"
import { PageWrapper } from "../../components/PageWrapper"
import { PageTitle } from "../../components/PageTitle"

import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField } from "@material-ui/core"
import { Edit, Check } from "@material-ui/icons"

function ProfilePage() {
    const dispatch = useDispatch()
    const profile = useProfile()
    const [appearsEdit, setAppearsEdit] = useState(false)
    const [name, setName] = useState("")
    
    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const closeEdit = async () => {
        await dispatch(changeName(name))
        setAppearsEdit(false)
    }

    return (
        <>
            <Appbar />
            <PageWrapper>
                <PageTitle variant="h6">
                    Perfil
                </PageTitle>
                <List>
                    <ListItem>
                        <ListItemText primary="Nome:" />
                        {appearsEdit
                            ?
                            <>
                                <ListItemText primary={
                                    <TextField
                                        name='name'
                                        placeholder={profile.name}
                                        type='text'
                                        value={name || ''}
                                        onChange={onChangeName}
                                        required                                       
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                            inputProps: {
                                                pattern: "[a-zA-Zà-úÀ-ú0-9 ]{3,}",
                                                title: "O nome deve conter apenas letras ou números, no mínimo de 3"
                                            }
                                        }}
                                    />
                                } />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="icon" color="primary"
                                        onClick={closeEdit}
                                    >
                                        <Check />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </>
                            :
                            <>
                                <ListItemText secondary={profile.name} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="icon" color="primary"
                                        onClick={() => setAppearsEdit(true)}
                                    >
                                        <Edit />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </>
                        }
                    </ListItem>

                    <ListItem>
                        <ListItemText primary="Apelido:" />
                        <ListItemText secondary={profile.nickname} />
                    </ListItem>

                    <ListItem>
                        <ListItemText primary="Email:" />
                        <ListItemText secondary={profile.email} />
                    </ListItem>

                    {profile.description &&
                        <ListItem>
                            <ListItemText primary="Descrição:" />
                            <ListItemText secondary={profile.description} />
                        </ListItem>
                    }
                </List>
            </PageWrapper>
            <Message />
            <Loading/>
        </>
    )
}

export default ProfilePage