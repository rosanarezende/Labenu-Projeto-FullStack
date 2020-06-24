import { BaseDatabase } from "./BaseDatabase";
import { User, UserRole, stringToUserRole } from "../model/User";

export class UserDatabase extends BaseDatabase {
    public static TABLE_NAME: string = "SpotenuUser";

    private toModel(dbModel?: any): User | undefined {
        return (
            dbModel &&
            new User(
                dbModel.id,
                dbModel.name,
                dbModel.email,
                dbModel.nickname,
                dbModel.password,
                dbModel.role,
                dbModel.description,
                dbModel.is_approved
            )
        );
    }

    public async createListeningOrAdmnistrationUser(user: User): Promise<void> {
        await super.connection()
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                nickname: user.getNickame(),
                password: user.getPassword(),
                role: user.getRole()
            })
            .into(UserDatabase.TABLE_NAME)
    }

    public async getUserById(id: string): Promise<User | undefined> {
        const result = await super.connection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ id })
        return this.toModel(result[0])
    }

    public async createBandUser(user: User): Promise<void> {
        await super.connection()
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                nickname: user.getNickame(),
                password: user.getPassword(),
                role: user.getRole(),
                description: user.getDescription(),
                is_approved: super.convertBooleanToTinyint(false)
            })
            .into(UserDatabase.TABLE_NAME)
    }

    public async getAllBands(): Promise<User[]> {
        const result = await super.connection().raw(`
            SELECT * 
            FROM ${UserDatabase.TABLE_NAME}
            WHERE role = "BAND"
        `)
        return result[0].map((res: any) => this.toModel(res))
    }

    public async approveBand(id: string): Promise<void> {
        await super.connection().raw(`
            UPDATE ${UserDatabase.TABLE_NAME}
            SET is_approved = 1 
            WHERE id = "${id}"
        `)
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        const result = await super.connection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email })
        return this.toModel(result[0])
    }

    public async getUserByNickname(nickname: string): Promise<User | undefined> {
        const result = await super.connection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ nickname })
        return this.toModel(result[0])
    }
    
    public async getAllUsers(): Promise<User[]> {
        const result = await super.connection().raw(`
            SELECT * 
            FROM ${UserDatabase.TABLE_NAME}
        `)
        return result[0].map((res: any) => this.toModel(res))
    }

    public async blockUser(id: string): Promise<void> {
        await super.connection().raw(`
            UPDATE ${UserDatabase.TABLE_NAME}
            SET is_approved = 0 
            WHERE id = "${id}"
        `)
    }

    public async changeNameById(id: string, name: string): Promise<void> {
        await super.connection().raw(`
            UPDATE ${UserDatabase.TABLE_NAME}
            SET name = "${name}"
            WHERE id = "${id}"
        `)
    }

    public async makePremium(id: string): Promise<void> {
        await super.connection().raw(`
            UPDATE ${UserDatabase.TABLE_NAME}
            SET role = "PAYING-LISTENER"
            WHERE id = "${id}"
        `)
    }

}
