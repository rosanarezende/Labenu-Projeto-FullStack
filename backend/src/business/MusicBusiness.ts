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
            throw new InvalidParameterError("Missing input");
        }

        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("User not found");
        }
        if (user.getRole() !== UserRole.BAND) {
            throw new UnauthorizedError("You must be a band to access this endpoint")
        }
        
        const foundAlbum = await this.albumDatabase.getAlbumById(albumId)
        if(!foundAlbum){
            throw new NotFoundError("Album not found")
        }

        const musicsInAlbum = await this.musicDatabase.getMusicsByAlbumId(albumId)
        const foundName = musicsInAlbum.find(item => item.getName() === name)
        if(foundName){
            throw new GenericError("A song with this name already exists on this album")
        }

        const id = this.idGenerator.generatorId()
        const music = new Music(id, name, albumId)
        await this.musicDatabase.createMusic(music)
    }
}