import { Request, Response } from "express";
import { GenreBusiness } from "../business/GenreBusiness";
import { GenreDatabase } from "../data/GenreDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";


export class GenreController {
    private static GenreBusiness = new GenreBusiness(
        new GenreDatabase(),
        new UserDatabase(),
        new IdGenerator(),
        new Authenticator()
    )

    public async addGenre(req: Request, res: Response) {
        const token = req.headers.authorization || req.headers.Authorization as string
        const { name } = req.body
        try {
            await GenreController.GenreBusiness.addGenre(name, token)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({ message: "Gênero adicionado com sucesso!" })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getAllGenres(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        try{
            const result = await GenreController.GenreBusiness.getAllGenres(token)
            // await BaseDatabase.destroyConnection()
            res.status(200).send(result)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }



}