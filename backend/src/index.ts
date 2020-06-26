import express from "express";
import cors from "cors"
import { AddressInfo } from "net";
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

const server = app.listen(process.env.PORT || 3001, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});