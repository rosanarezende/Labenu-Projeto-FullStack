import { BaseDatabase } from "./BaseDatabase";
import { Genre } from "../model/Genre";

export class GenreDatabase extends BaseDatabase {
    public static TABLE_NAME: string = "SpotenuGenre";

    private toModel(dbModel?: any): Genre | undefined {
        return dbModel && new Genre(dbModel.id, dbModel.name)
    }

    public async addGenre(genre: Genre): Promise<void> {
        await super.connection()
            .insert({
                id: genre.getId(),
                name: genre.getName()
            })
            .into(GenreDatabase.TABLE_NAME)
    }

    public async getGenreByName(name: string): Promise<Genre | undefined> {
        const result = await super.connection()
            .select("*")
            .from(GenreDatabase.TABLE_NAME)
            .where({ name })
        return this.toModel(result[0])
    }

    public async getAllGenres(): Promise<Genre[]> {
        const result = await super.connection().raw(`
            SELECT *
            FROM ${GenreDatabase.TABLE_NAME}
        `)
        return result[0].map((res: any) => this.toModel(res))
    }

}