import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    private static UserBusiness = new UserBusiness(
        new UserDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    );

    public async signupListeningUser(req: Request, res: Response) {
        const { name, email, nickname, password, role } = req.body
        try {
            const result = await UserController.UserBusiness.signupListeningUser(name, email, nickname, password, role)
            await BaseDatabase.destroyConnection()
            res.status(200).send(result)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async signupAdministratorUser(req: Request, res: Response) {
        const token = req.headers.authorization || req.headers.Authorization as string
        const { name, email, nickname, password } = req.body
        try {
            const result = await UserController.UserBusiness.signupAdministratorUser(name, email, nickname, password, token)
            await BaseDatabase.destroyConnection()
            res.status(200).send(result)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        } 
    }

    public async signupBandUser(req: Request, res: Response) {
        const { name, email, nickname, password, description } = req.body
        try {
            await UserController.UserBusiness.signupBandUser(name, email, nickname, password, description)
            await BaseDatabase.destroyConnection()
            res.status(200).send({
                message: "Artista cadastrado. Aguarde aprovação de um administrador para acessar a aplicação!"
            })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async login(req: Request, res: Response) {
        const { input, password } = req.body
        try {
            const result = await UserController.UserBusiness.login(input, password)
            await BaseDatabase.destroyConnection()
            res.status(200).send(result)
        }
        catch (err) {  
            await BaseDatabase.destroyConnection()         
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getAllBands(req: Request, res: Response) {
        const token = req.headers.authorization || req.headers.Authorization as string
        try {
            const bands = await UserController.UserBusiness.getAllBands(token)
            // await BaseDatabase.destroyConnection()
            res.status(200).send(bands)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async aproveBand(req: Request, res: Response) {
        const token = req.headers.authorization || req.headers.Authorization as string
        const { id } = req.body
        try {
            await UserController.UserBusiness.aproveBand(id, token)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({
                message: "Artista aprovado com sucesso!"
            })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getAllUsers(req: Request, res: Response) {
        const token = req.headers.authorization || req.headers.Authorization as string
        try {
            const users = await UserController.UserBusiness.getAllUsers(token)
            // await BaseDatabase.destroyConnection()
            res.status(200).send(users)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }
    
    public async blockUser(req: Request, res: Response) {
        const token = req.headers.authorization || req.headers.Authorization as string
        const { id } = req.body
        try {
            await UserController.UserBusiness.blockUser(id, token)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({
                message: "Usuário bloqueado com sucesso!"
            })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }  
    }

    public async getProfile(req: Request, res: Response) {
        const token = req.headers.authorization || req.headers.Authorization as string
        try {
            const user = await UserController.UserBusiness.getProfile(token)
            // await BaseDatabase.destroyConnection()
            res.status(200).send(user)
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async changeNameById(req: Request, res: Response) {
        const token = req.headers.authorization || req.headers.Authorization as string
        const { name } = req.body
        try {
            await UserController.UserBusiness.changeNameById(name, token)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({
                message: "Nome do usuário alterado com sucesso!"
            })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async makePremium(req: Request, res: Response) {
        const token = req.headers.authorization || req.headers.Authorization as string
        const { id } = req.body
        try {
            await UserController.UserBusiness.makePremium(id, token)
            // await BaseDatabase.destroyConnection()
            res.status(200).send({
                message: "Usuário trasnformado em PREMIUM com sucesso!"
            })
        }
        catch (err) {
            await BaseDatabase.destroyConnection()
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

}