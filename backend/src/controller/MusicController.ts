import { Request, Response } from "express";
import { MusicBusiness } from "../business/MusicBusiness";
import { MusicDatabase } from "../data/MusicDatabase";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { Music } from "../model/Music";

export class MusicController {
    private static MusicBusiness = new MusicBusiness(
        new MusicDatabase(),
        new AlbumDatabase(),
        new UserDatabase(),   
        new IdGenerator(),
        new Authenticator()
    )
    
    public async createMusic(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { name, albumId } = req.body
        try{
            await MusicController.MusicBusiness.createMusic(token, name, albumId)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({ message: "Música criada com sucesso!" })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getAllMusicsDetailed(req: Request, res: Response){
        try{
            const musics = await MusicController.MusicBusiness.getAllMusicsDetailed()
            // await BaseDatabase.destroyConnection()
            res.status(200).send(musics)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getMusicsByGenre(req: Request, res: Response){
        const { genreId } = req.params
        let page = Number(req.params.page) >= 1 ? Number(req.params.page) : 1
        try{
            const musics = await MusicController.MusicBusiness.getMusicsByGenre(genreId, page)
            // await BaseDatabase.destroyConnection()
            res.status(200).send(musics)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getMusicsList(req: Request, res: Response){
        const { page } = req.params
        try{
            const musics = await MusicController.MusicBusiness.getMusicsList(Number(page))
            // await BaseDatabase.destroyConnection()
            res.status(200).send(musics)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async countMusicsByGenre(req: Request, res: Response){
        const { id } = req.params
        try{
            const result = await MusicController.MusicBusiness.countMusicsByGenre(id)
            // await BaseDatabase.destroyConnection()
            res.status(200).send(result)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async countMusicsList(req: Request, res: Response){
        try{
            const result = await MusicController.MusicBusiness.countMusicsList()
            // await BaseDatabase.destroyConnection()
            res.status(200).send(result)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getMyMusics(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        try{
            const musics = await MusicController.MusicBusiness.getMyMusics(token)
            // await BaseDatabase.destroyConnection()
            res.status(200).send(musics)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async deleteMusic(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { id } = req.params
        try{
            await MusicController.MusicBusiness.deleteMusic(token, id)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({
                message: "Música deletada com sucesso!"
            })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async editMusicName(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { musicId, musicName } = req.body
        try{
            await MusicController.MusicBusiness.editMusicName(token, musicId, musicName)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({
                message: "Música editada com sucesso!"
            })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async editAlbumToMusic(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { musicId, albumId } = req.body
        try{
            await MusicController.MusicBusiness.editAlbumToMusic(token, musicId, albumId)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({
                message: "Música relacionada ao novo álbum com sucesso!"
            })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

}