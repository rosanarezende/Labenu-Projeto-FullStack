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
        const token = req.headers.authorization || req.headers.Authorization as string
        const { name, genreList } = req.body
        try {
            await AlbumController.AlbumBusiness.createAlbum(token, name, genreList)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({ message: "Álbum criado com sucesso!" })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getAlbunsByBandId(req: Request, res: Response) {
        const token = req.headers.authorization || req.headers.Authorization as string
        try {
            const albuns = await AlbumController.AlbumBusiness.getAlbunsByBandId(token)
            // await BaseDatabase.destroyConnection()
            res.status(200).send(albuns)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async deleteAlbum(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { id } = req.params
        try {
            await AlbumController.AlbumBusiness.deleteAlbum(token, id)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({ 
                message: "Álbum deletado com sucesso!" 
            })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async editAlbumName(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { albumId, albumName } = req.body
        try{
            await AlbumController.AlbumBusiness.editAlbumName(token, albumId, albumName)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({
                message: "Álbum editado com sucesso!"
            })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

}