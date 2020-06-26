import { BaseDatabase } from "./BaseDatabase";
import { Music } from "../model/Music";
import { off } from "process";

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
            ORDER BY m.name ASC
        `)

        let resultFormatted: any[] = []
        for (let music of result[0]) {
            const musicInArr = resultFormatted.find((item: any) =>
                item.music_id === music.music_id)
            if (!musicInArr) {
                let music2 = {
                    ...music,
                    genres: [{
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

    public async getMusicsByGenre(genreId: string, offset: number): Promise<any[]> {
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
            WHERE g.id = "${genreId}"
            ORDER BY m.name ASC
            LIMIT 10 offset ${offset}
        `)
        return result[0]
    }

    public async getMusicsList(offset: number): Promise<any[]> {
        const result = await super.connection()
            .select('*')
            .from(MusicDatabase.TABLE_NAME)
            .orderBy("name", "asc")
            .limit(10)
            .offset(offset)
        return result
    }

    public async countMusicsByGenre(genreId: string): Promise<number> {
        const result = await super.connection().raw(`
            SELECT COUNT(m.id) as count
            FROM SpotenuMusic m
            JOIN SpotenuAlbum a ON m.album_id = a.id
            JOIN SpotenuUser u ON a.band_id = u.id
            JOIN SpotenuGenreToAlbum ga ON a.id = ga.album_id
            JOIN SpotenuGenre g ON ga.genre_id = g.id
            WHERE g.id = "${genreId}"
        `)
        return result[0][0]
    }

    public async countMusicsList(): Promise<number> {
        const result = await super.connection().raw(`
            SELECT COUNT(m.id) as count
            FROM SpotenuMusic m;
        `)
        return result[0][0]
    }

    public async getMyMusics(bandId: string): Promise<any[]> {
        const result = await super.connection().raw(`
            SELECT 
                m.name as music_name,
                m.id as music_id,
                a.name as album_name,
                m.album_id,
                u.name as band_name,
                a.band_id
            FROM SpotenuMusic m
            JOIN SpotenuAlbum a ON m.album_id = a.id
            JOIN SpotenuUser u ON a.band_id = u.id
            WHERE a.band_id = "${bandId}"
        `)
        return result[0]
    }

    public async deleteMusic(id: string): Promise<void> {
        await super.connection().raw(`
            DELETE from SpotenuPlaylistToMusic
            WHERE music_id = "${id}"
        `)
        await super.connection().raw(`
            DELETE from SpotenuMusic
            WHERE id = "${id}"
        `)
    }

    public async getMusicById(id: string): Promise<Music | undefined> {
        const result = await super.connection().raw(`
            SELECT *
            FROM ${MusicDatabase.TABLE_NAME}
            WHERE id = "${id}"
        `)
        return this.toModel(result[0][0])
    }

    public async editMusicName(musicId: string, musicName: string): Promise<void>{
        await super.connection().raw(`
            UPDATE SpotenuMusic
            SET name = "${musicName}"
            WHERE id = "${musicId}";
        `)
    }

    public async editAlbumToMusic(musicId: string, albumId: string): Promise<void>{
        await super.connection().raw(`
            UPDATE SpotenuMusic
            SET album_id = "${albumId}"
            WHERE id = "${musicId}";
        `)
    }

}