import { MusicDatabase } from "../data/MusicDatabase";
import { AlbumDatabase } from "../data/AlbumDatabase";

import { IdGenerator } from "../services/IdGenerator";

import { Music } from "../model/Music";

import { NotFoundError } from "../errors/NotFoundError";
import { GenericError } from "../errors/GenericError";
import { Authenticator } from "../services/Authenticator";
import { UserDatabase } from "../data/UserDatabase";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UserRole } from "../model/User";

export class MusicBusiness {
    
    constructor(
        private musicDatabase: MusicDatabase,
        private albumDatabase: AlbumDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }
    
    public async createMusic(token: string, name: string, albumId: string){
        if (!name || !albumId || !token) {
            throw new InvalidParameterError("Preencha os campos para prosseguir.");
        }

        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Faça novo login");
        }
        if (user.getRole() !== UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para acessar esse endpoint.")
        }
        
        const foundAlbum = await this.albumDatabase.getAlbumById(albumId)
        if(!foundAlbum){
            throw new NotFoundError("Álbum não encontrado")
        }

        const musicsInAlbum = await this.musicDatabase.getMusicsByAlbumId(albumId)
        const foundName = musicsInAlbum.find(item => item.getName() === name)
        if(foundName){
            throw new GenericError("Uma música com esse nome já existe neste álbum")
        }

        const id = this.idGenerator.generatorId()
        const music = new Music(id, name, albumId)
        await this.musicDatabase.createMusic(music)
    }

    public async getAllMusicsDetailed(){
        const musics = await this.musicDatabase.getAllMusicsDetailed()
        return musics
    }

    public async getMusicsByGenre(genreId: string = "nope", page: number){       
        const offset = 10 * (page-1)
        const musics = await this.musicDatabase.getMusicsByGenre(genreId, offset)
        return musics
    }

    public async getMusicsList(page: number){
        const offset = 10 * (page-1)
        const musics = await this.musicDatabase.getMusicsList(offset)
        return musics
    }

    public async countMusicsByGenre(genreId: string){
        const result = await this.musicDatabase.countMusicsByGenre(genreId)
        return result
    }

    public async countMusicsList(){
        const result = await this.musicDatabase.countMusicsList()
        return result
    }

    public async getMyMusics(token: string){
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Faça novo login.");
        }
        if (user.getRole() !== UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para acessar esse endpoint.")
        }

        const musics = await this.musicDatabase.getMyMusics(userData.id)
        return musics
    }

    public async deleteMusic(token: string, id: string){
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Faça novo login.");
        }
        if (user.getRole() !== UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para acessar esse endpoint.")
        }

        const music = await this.musicDatabase.getMusicById(id)
        if(music?.getId() === undefined){
            throw new NotFoundError("Música não encontrada.");
        }
        
        await this.musicDatabase.deleteMusic(id)
    }

    public async editMusicName(token: string, musicId: string, musicName: string){
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Faça novo login.");
        }
        if (user.getRole() !== UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para acessar esse endpoint.")
        }

        const music = await this.musicDatabase.getMusicById(musicId)
        if(music?.getId() === undefined){
            throw new NotFoundError("Música não encontrada.");
        }

        await this.musicDatabase.editMusicName(musicId, musicName)

    }

    public async editAlbumToMusic(token: string, musicId: string, albumId: string){
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Faça novo login.");
        }
        if (user.getRole() !== UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para acessar esse endpoint.")
        }

        const music = await this.musicDatabase.getMusicById(musicId)
        if(music?.getId() === undefined){
            throw new NotFoundError("Música não encontrada.");
        }

        const album = await this.albumDatabase.getAlbumById(albumId)
        if(album?.getId() === undefined){
            throw new NotFoundError("Álbum não encontrado.");
        }

        await this.musicDatabase.editAlbumToMusic(musicId, albumId)

    }

}