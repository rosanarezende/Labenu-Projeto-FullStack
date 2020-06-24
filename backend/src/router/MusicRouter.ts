import express from "express";
import { MusicController } from "../controller/MusicController";

export const musicRouter = express.Router();
const musicController = new MusicController()

musicRouter.post("/create", musicController.createMusic)
musicRouter.post("/edit-name", musicController.editMusicName)
musicRouter.post("/change-album", musicController.editAlbumToMusic)

musicRouter.delete("/delete/:id", musicController.deleteMusic)

musicRouter.get("/all", musicController.getAllMusicsDetailed)
musicRouter.get("/my", musicController.getMyMusics)

musicRouter.get("/list/:page", musicController.getMusicsList)

musicRouter.get("/count/all", musicController.countMusicsList)
musicRouter.get("/count/:id", musicController.countMusicsByGenre)

musicRouter.get("/:genreId/:page", musicController.getMusicsByGenre)