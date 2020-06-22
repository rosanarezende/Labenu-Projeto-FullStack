import { Request, Response } from "express";
import { MusicBusiness } from "../business/MusicBusiness";
import { MusicDatabase } from "../data/MusicDatabase";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export class MusicController {
    private static MusicBusiness = new MusicBusiness(
        new MusicDatabase(),
        new AlbumDatabase(),
        new UserDatabase(),   
        new IdGenerator(),
        new Authenticator()
    )
    
    public async createMusic(req: Request, res: Response){
        const token = req.headers.authorization as string
        const { name, albumId } = req.body
        try{
            await MusicController.MusicBusiness.createMusic(token, name, albumId)
            await BaseDatabase.destroyConnection()
            res.status(200).send({ message: "Successfully created music" })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getAllMusicsDetailed(req: Request, res: Response){
        try{
            const musics = await MusicController.MusicBusiness.getAllMusicsDetailed()
            await BaseDatabase.destroyConnection()
            res.status(200).send(musics)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

}