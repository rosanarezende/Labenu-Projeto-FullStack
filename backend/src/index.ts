import express from "express";
import cors from "cors"

import { userRouter } from "./router/UserRouter";
import { genreRouter } from "./router/GenreRouter";
import { albumRouter } from "./router/AlbumRouter";
import { musicRouter } from "./router/MusicRouter";
import { playlistRouter } from "./router/PlaylistRouter";

const app = express();
app.use(cors())
app.use(express.json());

app.use("/", userRouter)
app.use("/genre", genreRouter)
app.use("/album", albumRouter)
app.use("/music", musicRouter)
app.use("/playlist", playlistRouter)

export default app