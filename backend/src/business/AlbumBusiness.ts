import { UserDatabase } from "../data/UserDatabase";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { GenreDatabase } from "../data/GenreDatabase";

import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";

import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { InvalidParameterError } from "../errors/InvalidParameterError";

import { User, stringToUserRole, UserRole } from "../model/User";
import { Album } from "../model/Album";

export class AlbumBusiness {
    constructor(
        private albumDatabase: AlbumDatabase,
        private userDatabase: UserDatabase,
        private genreDatabase: GenreDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
    ) { }

    public async createAlbum(token: string, name: string, genreList: string[]){
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() !== UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para cadastrar um álbum!")
        }
        if (!name || !genreList || !token) {
            throw new InvalidParameterError("Preencha os campos para prosseguir.");
        }

        const id = this.idGenerator.generatorId()
        const bandId = user.getId()

        const newAlbum = new Album(id, bandId, name)

        const genres = await this.genreDatabase.getAllGenres()
        for(const genre of genreList){
            let found = genres.find(item => item.getId() === genre)
            if(!found){
                throw new NotFoundError("Gênero não encontrado!")
            }
        }

        await this.albumDatabase.createAlbum(newAlbum)

        await this.albumDatabase.relateGenreAlbum(newAlbum.getId(), genreList)

    }


    public async getAlbunsByBandId(token: string) {
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() !== UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para buscar álbuns por artista!")
        }

        const albuns = await this.albumDatabase.getAlbunsByBandId(user.getId())
        return albuns
            
        // return bands.map(band => ({
        //         id: band.getId(),
        //         name: band.getName(),
        //         email: band.getEmail(),
        //         nickname: band.getNickame(),
        //         isApproved: band.getIsApproved() == true ? true : false
        // }))
    }

    // public async getAllAlbuns(token: string) {
    //     const userData = this.authenticator.verify(token)
    //     const user = await this.userDatabase.getUserById(userData.id)
    //     if (!user) {
    //         throw new NotFoundError("Usuário não encontrado. Realize novo login.");
    //     }
    //     if (user.getRole() !== UserRole.BAND) {
    //         throw new UnauthorizedError("Você não tem permissão para buscar álbuns por artista!")
    //     }

    //     const albuns = await this.albumDatabase.getAllAlbuns()
    //     return albuns
    // }

    public async deleteAlbum(token: string, albumId: string){
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() !== UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para deletar esse álbum!")
        }

        const album = await this.albumDatabase.getAlbumById(albumId)
        if(album?.getId() === undefined){
            throw new NotFoundError("Álbum não encontrado.");
        }
        
        // vou proteger no front, mas preciso pensar em como uma banda só pode deletar seus álbuns

        await this.albumDatabase.deleteAlbum(albumId)
    }

    public async editAlbumName(token: string, albumId: string, albumName: string){
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() !== UserRole.BAND) {
            throw new UnauthorizedError("Você não tem permissão para deletar esse álbum!")
        }

        const album = await this.albumDatabase.getAlbumById(albumId)
        if(album?.getId() === undefined){
            throw new NotFoundError("Álbum não encontrado.");
        }

        await this.albumDatabase.editAlbumName(albumId, albumName)

    }

}