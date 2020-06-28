import React from "react"
import { useSelector } from "react-redux"

import { useAllMusics } from "../../utils/customHooks"

import Appbar from "../../containers/Appbar"
import { PageWrapper } from "../../components/PageWrapper"
import { PageTitle } from "../../components/PageTitle"

import { Typography } from "@material-ui/core"

function MusicDetailPage() {
    const { musicIdSelected } = useSelector(state => state.musics)
    const allMusics = useAllMusics()
    const music = allMusics?.filter(item => item.music_id === musicIdSelected)[0]

    let genresArr = []
    if (music) {
        for (let genre of music?.genres) {
            genresArr.push(genre?.name)
        }
    }

    return (
        <>
            <Appbar />
            <PageWrapper>
                <PageTitle variant="h6" align="center">
                    {music?.music_name}
                </PageTitle>
                <Typography variant="subtitle1">
                    Álbum: <strong>{music?.album_name}</strong>
                </Typography>
                <Typography variant="caption" paragraph>
                    Gêneros: <strong>{genresArr?.join(", ")}</strong>
                </Typography>
                <Typography variant="subtitle1">
                    Artista: <strong>{music?.band_name}</strong>
                </Typography>
                <Typography variant="caption" paragraph>
                    Descrição: <strong>{music?.band_description}</strong>
                </Typography>
            </PageWrapper>
        </>
    )
}

export default MusicDetailPage