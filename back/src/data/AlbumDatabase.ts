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

    public async relateGenreAlbum(albumId: string, genreList: string[]): Promise<void>{
        for(const genre of genreList){
            await this.connection()
                .insert({
                   album_id: albumId,
                   genre_id: genre
                })
                .into(AlbumDatabase.TABLE_RELATION)
        }
    }


}