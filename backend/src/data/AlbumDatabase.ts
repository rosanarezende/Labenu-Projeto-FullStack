import { BaseDatabase } from "./BaseDatabase";
import { Album } from "../model/Album";

export class AlbumDatabase extends BaseDatabase {
    public static TABLE_NAME: string = "SpotenuAlbum";

    public static TABLE_RELATION: string = "SpotenuGenreToAlbum";

    private toModel(dbModel?: any): Album | undefined {
        return dbModel && new Album(dbModel.id, dbModel.band_id, dbModel.name)
    }

    public async createAlbum(album: Album): Promise<void> {
        await super.connection()
            .insert({
                id: album.getId(),
                band_id: album.getBandId(),
                name: album.getName()
            })
            .into(AlbumDatabase.TABLE_NAME)
    }

    public async getAlbumById(id: string): Promise<Album | undefined> {
        const result = await super.connection()
            .select("*")
            .from(AlbumDatabase.TABLE_NAME)
            .where({ id })
        return this.toModel(result[0])
    }

    public async relateGenreAlbum(albumId: string, genreList: string[]): Promise<void> {
        for (const genre of genreList) {
            await this.connection()
                .insert({
                    album_id: albumId,
                    genre_id: genre
                })
                .into(AlbumDatabase.TABLE_RELATION)
        }
    }

    public async getAlbunsByBandId(bandId: string): Promise<Album[]> {
        const result = await super.connection().raw(`
            SELECT * 
            FROM ${AlbumDatabase.TABLE_NAME}
            WHERE band_id = "${bandId}"
        `)
        return result[0].map((res: any) => this.toModel(res))
    }

    // public async getAllAlbuns(): Promise<Album[]> {
    //     const result = await super.connection().raw(`
    //         SELECT * 
    //         FROM ${AlbumDatabase.TABLE_NAME}
    //     `)
    //     return result[0].map((res: any) => this.toModel(res))
    // }

    public async deleteAlbum(albumId: string): Promise<void> {
        const result = await super.connection().raw(`
            SELECT 
                m.id as music_id,
                m.album_id
            FROM SpotenuPlaylist p
            JOIN SpotenuPlaylistToMusic pm ON p.id = pm.playlist_id
            JOIN SpotenuMusic m ON pm.music_id = m.id
            JOIN SpotenuAlbum a ON m.album_id = a.id
            WHERE a.id = "${albumId}";
        `)
        for (let item of result[0]) {
            await super.connection().raw(`
                DELETE from SpotenuPlaylistToMusic
                WHERE music_id = "${item?.music_id}"
            `)
        }
        await super.connection().raw(`
            DELETE from SpotenuMusic
            WHERE album_id = "${albumId}"
        `)
        await super.connection().raw(`
            DELETE from SpotenuGenreToAlbum
            WHERE album_id = "${albumId}"
        `)
        await super.connection().raw(`
            DELETE from ${AlbumDatabase.TABLE_NAME}
            WHERE id = "${albumId}"
        `)
    }

    public async getBandByAlbumId(albumId: string): Promise<Album | undefined> {
        const result = await super.connection().raw(`
            SELECT * 
            FROM SpotenuAlbum
            WHERE id = "${albumId}"
        `)
        return this.toModel(result[0])
    }

    public async editAlbumName(albumId: string, albumName: string): Promise<void> {
        await super.connection().raw(`
            UPDATE SpotenuAlbum
            SET name = "${albumName}"
            WHERE id = "${albumId}";
        `)
    }


}