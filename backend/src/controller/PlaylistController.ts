import { Request, Response } from "express";
import { AlbumBusiness } from "../business/AlbumBusiness";
import { PlaylistBusiness } from "../business/PlaylistBusiness";

import { UserDatabase } from "../data/UserDatabase";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { GenreDatabase } from "../data/GenreDatabase";
import { BaseDatabase } from "../data/BaseDatabase";
import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { MusicDatabase } from "../data/MusicDatabase";


export class PlaylistController {
    private static PlaylistBusiness = new PlaylistBusiness(
        new PlaylistDatabase(),
        new UserDatabase(),
        new MusicDatabase(),
        new IdGenerator(),
        new Authenticator()
    )    

    public async createPlaylist(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { name } = req.body
        try {
            await PlaylistController.PlaylistBusiness.createPlaylist(token, name)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({ message: "Playlist criada com sucesso!" })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getPlaylistsByUserId(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        try {
            const result = await PlaylistController.PlaylistBusiness.getPlaylistsByUserId(token)
            // await BaseDatabase.destroyConnection()
            res.status(200).send(result)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async addMusicToPlaylist(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { playlistId, musicId } = req.body
        try {
            await PlaylistController.PlaylistBusiness.addMusicToPlaylist(token, musicId, playlistId)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({ message: "Música adicionada a playlist com sucesso!" })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async removeMusicFromPlaylist(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { playlistId, musicId } = req.body
        try {
            await PlaylistController.PlaylistBusiness.removeMusicFromPlaylist(token, musicId, playlistId)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({ message: "Música removida da playlist com sucesso!" })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async deletePlaylist(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { id } = req.params
        try {
            await PlaylistController.PlaylistBusiness.deletePlaylist(token, id)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({ message: "Playlist deletada com sucesso!" })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getPlaylistDetail(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { id, page } = req.params
        console.log(req.headers)
        try {
            const result = await PlaylistController.PlaylistBusiness.getPlaylistDetail(token, id, Number(page))
            // await BaseDatabase.destroyConnection()
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async countPlaylistDetail(req: Request, res: Response){
        const { id } = req.params
        try {
            const result = await PlaylistController.PlaylistBusiness.countPlaylistDetail(id)
            // await BaseDatabase.destroyConnection()
            res.status(200).send(result)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async makeCollaborative(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { playlistId, option } = req.body
        try {
            await PlaylistController.PlaylistBusiness.makeCollaborative(token, playlistId, option)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({ message: "Opção de colaboração alterada com sucesso!" })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async editPlaylistName(req: Request, res: Response){
        const token = req.headers.authorization || req.headers.Authorization as string
        const { playlistId, playlistName } = req.body
        try {
            await PlaylistController.PlaylistBusiness.editPlaylistName(token, playlistId, playlistName)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({ message: "Nome da playlist alterado com sucesso!" })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

}