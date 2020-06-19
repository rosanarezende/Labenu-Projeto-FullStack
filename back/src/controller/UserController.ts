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

    // 1
    public async signupListeningUser(req: Request, res: Response) {
        const { name, email, nickname, password, role } = req.body
        try {
            const result = await UserController.UserBusiness.signupListeningUser(name, email, nickname, password, role)
            res.status(200).send(result)
        }
        catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
        await BaseDatabase.destroyConnection()
    }

    //2
    public async signupAdministratorUser(req: Request, res: Response) {
        const token = req.headers.authorization as string
        const { name, email, nickname, password } = req.body
        try {
            const result = await UserController.UserBusiness.signupAdministratorUser(name, email, nickname, password, token)
            res.status(200).send(result)
        }
        catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
        await BaseDatabase.destroyConnection()
    }

    //3
    public async signupBandUser(req: Request, res: Response) {
        const { name, email, nickname, password, description } = req.body
        try {
            await UserController.UserBusiness.signupBandUser(name, email, nickname, password, description)
            res.status(200).send({
                message: "Registered band. Wait for approval by the administrator!"
            })
        }
        catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
        await BaseDatabase.destroyConnection()
    }

    //4
    public async getAllBands(req: Request, res: Response) {
        const token = req.headers.authorization as string
        try {
            const bands = await UserController.UserBusiness.getAllBands(token)
            res.status(200).send(bands)
        }
        catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
        await BaseDatabase.destroyConnection()
    }

    //5
    public async aproveBand(req: Request, res: Response) {
        const token = req.headers.authorization as string
        const { id } = req.body
        try {
            await UserController.UserBusiness.aproveBand(id, token)
            res.status(200).send({
                message: "Approved band!"
            })
        }
        catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
        await BaseDatabase.destroyConnection()
    }

    //6
    public async login(req: Request, res: Response) {
        const { input, password } = req.body
        console.log(input)
        try {
            const result = await UserController.UserBusiness.login(input, password)
            res.status(200).send(result)
        }
        catch (err) {           
            res.status(err.errorCode || 400).send({ message: err.message });
        }
        await BaseDatabase.destroyConnection()
    }

}