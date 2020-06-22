import { BaseDatabase } from "./BaseDatabase";
import { Music } from "../model/Music";

export class MusicDatabase extends BaseDatabase {
    public static TABLE_NAME: string = "SpotenuMusic";

    private toModel(dbModel?: any): Music | undefined {
        return dbModel && new Music(dbModel.id, dbModel.name, dbModel.album_id)
    }

    public async createMusic(music: Music): Promise<void> {
        await super.connection()
            .insert({
                id: music.getId(),
                name: music.getName(),
                album_id: music.getAlbumId()
            })
            .into(MusicDatabase.TABLE_NAME)
    }

    public async getMusicsByAlbumId(albumId: string): Promise<Music[]> {
        const result = await super.connection().raw(`
            SELECT *
            FROM ${MusicDatabase.TABLE_NAME}
            WHERE album_id = "${albumId}"
        `)
        return result[0].map((res: any) => this.toModel(res))
    }

    // lembrar q não tem gênero
    public async getAllMusicsDetailed(): Promise<any[]> {
        const result = await super.connection().raw(`
            SELECT 
                m.name as music_name,
                m.id as music_id,
                a.name as album_name,
                m.album_id,
                u.name as band_name,
                u.id as band_id,
                u.description as band_description,
                g.name as genre_name,
                g.id as genre_id
            FROM SpotenuMusic m
            JOIN SpotenuAlbum a ON m.album_id = a.id
            JOIN SpotenuUser u ON a.band_id = u.id
            JOIN SpotenuGenreToAlbum ga ON a.id = ga.album_id
            JOIN SpotenuGenre g ON ga.genre_id = g.id
        `)

        let resultFormatted: any[] = []
        for (let music of result[0]) {
            const musicInArr = resultFormatted.find((item: any) =>
                 item.music_id === music.music_id)
                 if(!musicInArr){
                    let music2 = {
                        ...music,
                        genres: [ {
                            name: music.genre_name,
                            id: music.genre_id
                        }]

                    }
                    resultFormatted.push(music2)
                 }
                 else {
                     musicInArr.genres.push({
                        name: music.genre_name,
                        id: music.genre_id
                    })
                 }
        }

        return resultFormatted
    }

}