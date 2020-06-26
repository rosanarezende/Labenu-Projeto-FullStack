import { BaseDatabase } from "./BaseDatabase";
import { Playlist } from "../model/Playlist";

export class PlaylistDatabase extends BaseDatabase {
    public static TABLE_NAME: string = "SpotenuPlaylist";

    public static TABLE_RELATION: string = "SpotenuPlaylistToMusic";

    private toModel(dbModel?: any): Playlist | undefined {
        return dbModel &&
            new Playlist(
                dbModel.id,
                dbModel.name,
                dbModel.user_id,
                dbModel.collaborative
            )
    }

    public async createPlaylist(playlist: Playlist): Promise<void> {
        await super.connection()
            .insert({
                id: playlist.getId(),
                name: playlist.getName(),
                user_id: playlist.getUserId(),
                collaborative: super.convertBooleanToTinyint(false)
            })
            .into(PlaylistDatabase.TABLE_NAME)
    }

    public async relatePlaylistMusic(playlistId: string, musicList: string[]): Promise<void> {
        for (const music of musicList) {
            await this.connection()
                .insert({
                    playlist_id: playlistId,
                    music_id: music
                })
                .into(PlaylistDatabase.TABLE_RELATION)
        }
    }

    public async relateOneMusicToPlaylist(playlistId: string, musicId: string): Promise<void> {
            await this.connection()
                .insert({
                    playlist_id: playlistId,
                    music_id: musicId
                })
                .into(PlaylistDatabase.TABLE_RELATION)
    }

    public async makeCollaborative(playlistId: string, option: number): Promise<void> {
        await super.connection().raw(`
            UPDATE ${PlaylistDatabase.TABLE_NAME}
            SET collaborative = ${option} 
            WHERE id = "${playlistId}"
        `)
    }

    // public async getPlaylistsByUserId(userId: string): Promise<Playlist[]> {
    //     const result = await super.connection().raw(`
    //         SELECT * 
    //         FROM ${PlaylistDatabase.TABLE_NAME}
    //         WHERE user_id = "${userId}"
    //         ORDER BY name
           
    //     `)
    //     //  LIMIT 10 offset ${offset}
    //     return result[0].map((res: any) => this.toModel(res))
    // }

    public async getPlaylistsByUserId(userId: string): Promise<Playlist[]> {
        const result = await super.connection().raw(`
            SELECT * 
            FROM ${PlaylistDatabase.TABLE_NAME}
            WHERE user_id = "${userId}"
            ORDER BY name
        `)
        return result[0].map((res: any) => this.toModel(res))
    }


    public async getPlaylistById(id: string): Promise<Playlist | undefined> {
        const result = await super.connection()
            .select("*")
            .from(PlaylistDatabase.TABLE_NAME)
            .where({ id })
        return this.toModel(result[0])
    }

    public async getPlaylistDetail(playlistId: string, offset: number): Promise<Playlist | undefined> {
        const result = await super.connection().raw(`
            SELECT 
                p.name,
                p.id,
                p.user_id,
                p.collaborative,
                m.name as music_name,
                m.id as music_id,
                a.name as album_name,
                m.album_id
            FROM SpotenuPlaylist p
            JOIN SpotenuPlaylistToMusic pm ON p.id = pm.playlist_id
            JOIN SpotenuMusic m ON pm.music_id = m.id
            JOIN SpotenuAlbum a ON m.album_id = a.id
            WHERE p.id = "${playlistId}"
            ORDER BY m.name
            LIMIT 10 offset ${offset}
        `)
        return result[0]
    }

    public async countPlaylistDetail(playlistId: string): Promise<number> {
        const result = await super.connection().raw(`
            SELECT COUNT(pm.music_id) as count
            FROM SpotenuPlaylistToMusic pm
            WHERE playlist_id = "${playlistId}";
        `)
        return result[0][0]
    }


    public async findMusicInPlaylist(musicId: string, playlistId: string): Promise<any | undefined>{
        const result = await super.connection().raw(`
            SELECT * 
            FROM ${PlaylistDatabase.TABLE_RELATION}
            WHERE music_id = "${musicId}" 
            AND playlist_id = "${playlistId}";
        `)
        return result[0]
    }

    public async removeMusicFromPlaylist(musicId: string, playlistId: string): Promise<void>{
        await super.connection().raw(`
            DELETE FROM ${PlaylistDatabase.TABLE_RELATION}
            WHERE music_id = "${musicId}" 
            AND playlist_id = "${playlistId}";
        `)
    }

    public async deletePlaylist(playlistId: string): Promise<void> {
        await super.connection().raw(`
            DELETE FROM ${PlaylistDatabase.TABLE_RELATION}
            WHERE playlist_id = "${playlistId}";
        `)
        await super.connection().raw(`
            DELETE FROM ${PlaylistDatabase.TABLE_NAME}
            WHERE id = "${playlistId}";
        `)
    }

    public async editPlaylistName(playlistId: string, playlistName: string): Promise<void>{
        await super.connection().raw(`
            UPDATE ${PlaylistDatabase.TABLE_NAME}
            SET name = "${playlistName}"
            WHERE id = "${playlistId}";
        `)
    }

    




    // public async getAllAlbuns(): Promise<Album[]> {
    //     const result = await super.connection().raw(`
    //         SELECT * 
    //         FROM ${AlbumDatabase.TABLE_NAME}
    //     `)
    //     return result[0].map((res: any) => this.toModel(res))
    // }

    // public async deleteAlbum(albumId: string): Promise<void> {
    //     await super.connection().raw(`
    //         DELETE from SpotenuMusic
    //         WHERE album_id = "${albumId}"
    //     `)
    //     await super.connection().raw(`
    //         DELETE from SpotenuGenreToAlbum
    //         WHERE album_id = "${albumId}"
    //     `)
    //     await super.connection().raw(`
    //         DELETE from ${AlbumDatabase.TABLE_NAME}
    //         WHERE id = "${albumId}"
    //     `)
    // }

    // public async getBandByAlbumId(albumId: string): Promise<Album | undefined>{
    //     const result = await super.connection().raw(`
    //         SELECT * 
    //         FROM SpotenuAlbum
    //         WHERE id = "${albumId}"
    //     `)
    //     return this.toModel(result[0])
    // }

    // public async editAlbumName(albumId: string, albumName: string): Promise<void>{
    //     await super.connection().raw(`
    //         UPDATE SpotenuAlbum
    //         SET name = "${albumName}"
    //         WHERE id = "${albumId}";
    //     `)
    // }


}