import { GenreDatabase } from "../data/GenreDatabase";
import { UserDatabase } from "../data/UserDatabase";

import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";

import { InvalidParameterError } from "../errors/InvalidParameterError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

import { Genre } from "../model/Genre";
import { UserRole } from "../model/User";
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
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() !== UserRole.ADMINISTRATOR) {
            throw new UnauthorizedError("Você não tem permissão para cadastrar um gênero!")
        }
        
        if(!name || !token){
            throw new InvalidParameterError("Preencha os campos para prosseguir.");
        }

        const genre = await this.genreDatabase.getGenreByName(name)
        if(genre){
            throw new GenericError("Esse gênero já foi adicionado anteriormente.")
        }

        const id = this.idGenerator.generatorId()

        const newGenre = new Genre(id, name)
        await this.genreDatabase.addGenre(newGenre)
    }


    public async getAllGenres(token: string){
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        
        const genres = await this.genreDatabase.getAllGenres()
        return genres
    }
   

}