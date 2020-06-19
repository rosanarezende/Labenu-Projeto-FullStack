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
            throw new NotFoundError("User not found");
        }
        if (user.getRole() !== UserRole.BAND) {
            throw new UnauthorizedError("You must be a band to access this endpoint")
        }
        if (!name || !genreList || !token) {
            throw new InvalidParameterError("Missing input");
        }

        const id = this.idGenerator.generatorId()
        const bandId = user.getId()

        const newAlbum = new Album(id, bandId, name)

        const genres = await this.genreDatabase.getAllGenres()
        for(const genre of genreList){
            let found = genres.find(item => item.getId() === genre)
            if(!found){
                throw new NotFoundError("Genre not found")
            }
        }

        await this.albumDatabase.createAlbum(newAlbum)

        await this.albumDatabase.relateGenreAlbum(newAlbum.getId(), genreList)

    }


}