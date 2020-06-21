import express from "express";
import { MusicController } from "../controller/MusicController";

export const musicRouter = express.Router();
const musicController = new MusicController()

musicRouter.post("/create", musicController.createMusic)