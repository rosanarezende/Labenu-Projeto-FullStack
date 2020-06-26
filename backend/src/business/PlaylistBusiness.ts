import { UserDatabase } from "../data/UserDatabase";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { GenreDatabase } from "../data/GenreDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { PlaylistDatabase } from "../data/PlaylistDatabase";


import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";

import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { InvalidParameterError } from "../errors/InvalidParameterError";

import { User, stringToUserRole, UserRole } from "../model/User";
import { Album } from "../model/Album";
import { Playlist } from "../model/Playlist";
import { GenericError } from "../errors/GenericError";


export class PlaylistBusiness {
    constructor(
        private playlistDatabase: PlaylistDatabase,
        private userDatabase: UserDatabase,
        private musicDatabase: MusicDatabase,
        // private albumDatabase: AlbumDatabase,
        // private genreDatabase: GenreDatabase,

        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
    ) { }

    public async createPlaylist(token: string, name: string) {
        if (!name || !token) {
            throw new InvalidParameterError("Preencha os campos para prosseguir.");
        }

        const userLoggedData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userLoggedData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() !== UserRole.PAYINGLISTENER) {
            throw new UnauthorizedError("Você não tem permissão para cadastrar uma playlist!")
        }

        const id = this.idGenerator.generatorId()
        const userId = user.getId()

        const newPlaylist = new Playlist(id, name, userId)


        await this.playlistDatabase.createPlaylist(newPlaylist)

    }

    public async getPlaylistsByUserId(token: string) {
        const userLoggedData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userLoggedData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() !== UserRole.PAYINGLISTENER) {
            throw new UnauthorizedError("Você não tem permissão para cadastrar uma playlist!")
        }

        const userId = user.getId()

        const playlists = await this.playlistDatabase.getPlaylistsByUserId(userId)
        return playlists
    }


    public async addMusicToPlaylist(token: string, musicId: string, playlistId: string) {
        const userLoggedData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userLoggedData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() === UserRole.ADMINISTRATOR || user.getRole() === UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para cadastrar uma playlist!")
        }

        const music = await this.musicDatabase.getMusicById(musicId)
        if (!music) {
            throw new NotFoundError("Música não encontrada!")
        }

        const playlist = await this.playlistDatabase.getPlaylistById(playlistId)
        if (!playlist) {
            throw new NotFoundError("Playlist não encontrada!")
        }
        if (playlist.getCollaborative() === false) {
            const usserLoggedPlaylists = await this.playlistDatabase.getPlaylistsByUserId(user.getId())
            let found = usserLoggedPlaylists.find(playlist => playlist.getId() === playlistId)
            if (!found) {
                throw new NotFoundError("Você não tem permissão para adicionar música nessa playlist!")
            }
        }

        const findMusicInPlaylist = await this.playlistDatabase.findMusicInPlaylist(musicId, playlistId)
        if(findMusicInPlaylist.length !== 0){
            throw new GenericError("Essa música já foi adicionada na playlist")
        }

        await this.playlistDatabase.relateOneMusicToPlaylist(playlistId, musicId)
    }

    // se fossem várias músicas
    // const musics = await this.musicDatabase.getAllMusics()
    // for(const music of musicList){
    //     let found = musics.find(item => item.getId() === music)
    //     if(!found){
    //         throw new NotFoundError("Música não encontrada!")
    //     }
    // }


    public async removeMusicFromPlaylist(token: string, musicId: string, playlistId: string){
        const userLoggedData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userLoggedData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Faça novo login.");
        }
        if (user.getRole() === UserRole.ADMINISTRATOR || user.getRole() === UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para cadastrar uma playlist!")
        }

        const music = await this.musicDatabase.getMusicById(musicId)
        if (!music) {
            throw new NotFoundError("Música não encontrada!")
        }

        const playlist = await this.playlistDatabase.getPlaylistById(playlistId)
        if (!playlist) {
            throw new NotFoundError("Playlist não encontrada!")
        }

        if (playlist.getCollaborative() === false) {
            const myPlaylists = await this.playlistDatabase.getPlaylistsByUserId(user.getId())
            const findPlaylist = myPlaylists.find(playlist => playlist.getId() === playlistId)
            if(!findPlaylist){
                throw new GenericError("Você não pode deletar musica de uma playlist que não criou")
            }
        }

        await this.playlistDatabase.removeMusicFromPlaylist(musicId, playlistId)

    }

    public async deletePlaylist(token: string, playlistId: string){
        const userLoggedData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userLoggedData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Faça novo login.");
        }
        if (user.getRole() === UserRole.ADMINISTRATOR || user.getRole() === UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para cadastrar uma playlist!")
        }

        const playlist = await this.playlistDatabase.getPlaylistById(playlistId)
        if (!playlist) {
            throw new NotFoundError("Playlist não encontrada!")
        }

        // só quem pode deletar a playlist é quem o criou??? e ser for colab???
        if (playlist.getCollaborative() === false) {
            const myPlaylists = await this.playlistDatabase.getPlaylistsByUserId(user.getId())
            const findPlaylist = myPlaylists.find(playlist => playlist.getId() === playlistId)
            if(!findPlaylist){
                throw new GenericError("Você não pode deletar musica de uma playlist que não criou")
            }
        }

        await this.playlistDatabase.deletePlaylist(playlistId)

    }

    public async getPlaylistDetail(token: string, playlistId: string = "nope", page: number) {
        const userLoggedData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userLoggedData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() === UserRole.ADMINISTRATOR || user.getRole() === UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para cadastrar uma playlist!")
        }

        const offset = 10 * (page-1)
        const playlistDetail = await this.playlistDatabase.getPlaylistDetail(playlistId, offset)
        if (!playlistDetail) {
            throw new NotFoundError("Playlist não encontrada!")
        }

        return playlistDetail
    }

    public async countPlaylistDetail(playlistId: string){
        const result = await this.playlistDatabase.countPlaylistDetail(playlistId)
        return result
    }

    public async makeCollaborative(token: string, playlistId: string, option: number){
        const userLoggedData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userLoggedData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() !== UserRole.PAYINGLISTENER) {
            throw new UnauthorizedError("Você não tem permissão para cadastrar uma playlist!")
        }

        const playlist = await this.playlistDatabase.getPlaylistById(playlistId)
        if (!playlist) {
            throw new NotFoundError("Playlist não encontrada!")
        }

        await this.playlistDatabase.makeCollaborative(playlistId, option)

    }

    public async editPlaylistName(token: string, playlistId: string, playlistName: string){
        const userLoggedData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userLoggedData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() === UserRole.ADMINISTRATOR || user.getRole() === UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para cadastrar uma playlist!")
        }

        const playlist = await this.playlistDatabase.getPlaylistById(playlistId)
        if (!playlist) {
            throw new NotFoundError("Playlist não encontrada!")
        }

        if (user.getRole() !== UserRole.NONPAYINGLISTENER && playlist.getCollaborative() === false) {
                throw new GenericError("Você não pode alterar o nome dessa playlist")
        }

        await this.playlistDatabase.editPlaylistName(playlistId, playlistName)

    }



}
