import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { usePlaylistDetail } from "../../utils/customHooks"
import { removeMusicFromPlaylist, makeCollaborative, editPlaylistName } from "../../actions/playlists"

import Appbar from "../../containers/Appbar"
import Loading from "../../containers/Loading"
import Message from "../../components/Message"

import * as S from "./styles"
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton, Typography, TextField, Grid, Switch } from "@material-ui/core"
import { HighlightOff, Edit, Check } from "@material-ui/icons"
import { Pagination } from "@material-ui/lab"

function PlaylistDetailPage() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const { playlistDetail, numPlaylistDetail } = usePlaylistDetail(page)
    const [appearsEditName, setAppearsEditName] = useState(false)
    const [name, setName] = useState(playlistDetail[0]?.name)
    const [collaborative, setCollaborative] = useState(playlistDetail[0]?.collaborative === 0 ? false : true)
    
    const onChangeName = (e) => { setName(e.target.value) }

    const closeEditName = async () => {
        const info = {
            playlistName: name,
            playlistId: playlistDetail[0]?.id
        }
        await dispatch(editPlaylistName(info))
        setAppearsEditName(false)
    }

    const handleChangeCollaborative = async (e) => {
        await setCollaborative(e.target.checked)
        const option = !collaborative
        const info = {
            option: option === true ? 1 : 0,
            playlistId: playlistDetail[0]?.id
        }
        dispatch(makeCollaborative(info))
    }

    const onRemoveMusic = (id) => {
        const info = {
            playlistId: playlistDetail[0]?.id,
            musicId: id
        }
        dispatch(removeMusicFromPlaylist(info))
    }

    let pages = Math.ceil(numPlaylistDetail / 10) || 3

    const handleChange = (event, value) => { setPage(value) }

    return (
        <>
            <Appbar />
            <S.PlaylistDetailWrapper>
                <S.PlaylistDetailTitle variant="h6" align="center">
                    Detalhes da Playlist
                </S.PlaylistDetailTitle>

                <List>
                    <ListItem>
                        <ListItemText primary="Nome:" />
                        {appearsEditName
                            ?
                            <>
                                <ListItemText secondary={
                                    <TextField
                                        name='name'
                                        placeholder={name}
                                        type='text'
                                        value={name || ''}
                                        onChange={onChangeName}
                                        required
                                        InputLabelProps={{ shrink: true }}
                                    />
                                } />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="icon" color="primary"
                                        onClick={closeEditName}
                                    >
                                        <Check />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </>

                            :
                            <>
                                <ListItemText secondary={playlistDetail[0]?.name} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="icon" color="primary"
                                        onClick={() => setAppearsEditName(true)}
                                    >
                                        <Edit />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </>
                        }
                    </ListItem>

                    <ListItem>
                        <ListItemText primary="Colaborativa?" />

                        <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>Não</Grid>
                                <Grid item>
                                    <Switch checked={collaborative} onChange={handleChangeCollaborative} name="collaborative" />
                                </Grid>
                                <Grid item>Sim</Grid>
                            </Grid>
                        </Typography>

                        <ListItemText primary="" />
                    </ListItem>
                </List>

                <Typography variant="button" style={{ marginTop: "2em" }}>
                    Músicas adicionadas
                </Typography>
                <Pagination count={pages} size="small" onChange={handleChange} color="primary" variant="text" style={{ margin: "1em auto" }} />
                <List>
                    {playlistDetail?.map(item => {
                        return (<ListItem key={item?.music_id}>
                            <ListItemAvatar >
                                <Avatar style={{ backgroundColor: "rgba(30, 215, 96, 1)" }}>
                                    {item?.music_name?.slice(0, 1).toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item?.music_name}
                                secondary={`Álbum: ${item?.album_name}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="icon" color="default"
                                    onClick={() => onRemoveMusic(item?.music_id)}
                                >
                                    <HighlightOff />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>)
                    })}
                </List>
            </S.PlaylistDetailWrapper>
            <Loading />
            <Message />
        </>
    )
}

export default PlaylistDetailPage