import { Request, Response } from "express";
import { AlbumBusiness } from "../business/AlbumBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { GenreDatabase } from "../data/GenreDatabase";
import { BaseDatabase } from "../data/BaseDatabase";

export class AlbumController {
    private static AlbumBusiness = new AlbumBusiness(
        new AlbumDatabase(),
        new UserDatabase(),
        new GenreDatabase(),
        new IdGenerator(),
        new Authenticator()
    )

    public async createAlbum(req: Request, res: Response){
        const token = req.headers.authorization as string
        const { name, genreList } = req.body
        try {
            await AlbumController.AlbumBusiness.createAlbum(token, name, genreList)
            res.status(200).send({ message: "Successfully created album" })
        }
        catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
        await BaseDatabase.destroyConnection()
    }

}