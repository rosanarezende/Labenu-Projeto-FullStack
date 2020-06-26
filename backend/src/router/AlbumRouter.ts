import express from "express";
import { AlbumController } from "../controller/AlbumController";

export const albumRouter = express.Router();
const albumController = new AlbumController()

albumRouter.post("/create", albumController.createAlbum)
albumRouter.post("/edit-name", albumController.editAlbumName)

albumRouter.delete("/delete/:id", albumController.deleteAlbum)

albumRouter.get("/band", albumController.getAlbunsByBandId)