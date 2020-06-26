import express from "express";
import { PlaylistController } from "../controller/PlaylistController";

export const playlistRouter = express.Router();
const playlistController = new PlaylistController()

playlistRouter.get("/my", playlistController.getPlaylistsByUserId)
playlistRouter.get("/detail/:id/:page", playlistController.getPlaylistDetail)
playlistRouter.get("/count/:id", playlistController.countPlaylistDetail)

playlistRouter.post("/create", playlistController.createPlaylist)
playlistRouter.post("/add-music", playlistController.addMusicToPlaylist)
playlistRouter.post("/collaborative", playlistController.makeCollaborative)
playlistRouter.post("/edit-name", playlistController.editPlaylistName)

playlistRouter.delete("/remove-music", playlistController.removeMusicFromPlaylist)
playlistRouter.delete("/delete/:id", playlistController.deletePlaylist)
