import { GenreDatabase } from "../data/GenreDatabase";
import { UserDatabase } from "../data/UserDatabase";

import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";

import { InvalidParameterError } from "../errors/InvalidParameterError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

import { Genre, stringToGenreOption } from "../model/Genre";
import { User, stringToUserRole, UserRole } from "../model/User";
import { GenericError } from "../errors/GenericError";

export class GenreBusiness {
    constructor(
        private genreDatabase: GenreDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
    ) { }
    
    public async addGenre(name: string, token: string){
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("User not found");
        }
        if (user.getRole() !== UserRole.ADMINISTRATOR) {
            throw new UnauthorizedError("You must be an admin to access this endpoint")
        }
        
        if(!name || !token){
            throw new InvalidParameterError("Missing input");
        }

        const genre = await this.genreDatabase.getGenreByName(name)
        if(genre){
            throw new GenericError("This genre has already been added")
        }

        const id = this.idGenerator.generatorId()

        const newGenre = new Genre(id, stringToGenreOption(name))
        await this.genreDatabase.addGenre(newGenre)
    }

    public async getAllGenres(token: string){
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("User not found");
        }
        if (user.getRole() === UserRole.NONPAYINGLISTENER || user.getRole() === UserRole.PAYINGLISTENER) {
            throw new UnauthorizedError("You must be an admin or band to access this endpoint")
        }
        
        const genres = await this.genreDatabase.getAllGenres()
        return genres
    }
   

}