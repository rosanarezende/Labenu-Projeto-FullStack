import React from "react"
import { useSelector } from "react-redux"

import Appbar from "../../containers/Appbar"
import Message from "../../components/Message"

import { useAllMusics } from "../../utils/customHooks"

function SearchPage(props){
    const { inputSearch, selectedGenre } = useSelector(state => state.search)
    const allMusics = useAllMusics()
        
    let filteredMusics = []
    let filteredSearch = allMusics?.filter(music => {
        const musicName = music?.music_name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        const input = inputSearch?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        return inputSearch ? musicName.includes(input) : true
    })
    let filteredGender = filteredSearch?.filter(music => {
        for(let genre of music.genres){
            return selectedGenre ? genre.id === selectedGenre : true
        }
    })
    if(inputSearch || selectedGenre) filteredMusics = filteredGender

    return (
        <>
            <Appbar/>
                {filteredMusics?.length === 0
                    ? <div>Procurar...</div>
                    : filteredMusics?.map(music => 
                        <div>{music.music_name}</div>)
                }
            <Message/>
        </>
    )
}

export default SearchPage