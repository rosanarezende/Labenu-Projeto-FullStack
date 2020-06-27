import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { User, stringToUserRole, UserRole } from "../model/User";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { GenericError } from "../errors/GenericError";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ) { }

    public async signupListeningUser(
        name: string,
        email: string,
        nickname: string,
        password: string,
        role: string
    ) {
        if (!name || !email || !nickname || !password || !role) {
            throw new InvalidParameterError("Preencha os campos para prosseguir.");
        }
        if (email.indexOf("@") === -1) {
            throw new InvalidParameterError("Email inválido");
        }
        if (password.length < 6) {
            throw new InvalidParameterError("Senha inválida");
        }

        const id = this.idGenerator.generatorId()

        const cryptedPassword = await this.hashManager.hash(password)

        const user = new User(id, name, email, nickname, cryptedPassword, stringToUserRole(role))

        await this.userDatabase.createListeningOrAdmnistrationUser(user)

        const accessToken = this.authenticator.generateToken({ id, role })

        return { accessToken, role: user.getRole(), name: user.getName() }
    }

    public async signupAdministratorUser(
        name: string,
        email: string,
        nickname: string,
        password: string,
        token: string
    ) {
        if (!name || !email || !nickname || !password || !token) {
            throw new InvalidParameterError("Preencha os campos para prosseguir.");
        }

        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() !== UserRole.ADMINISTRATOR) {
            throw new UnauthorizedError("Você não tem permissão para cadastrar um usuário administrador!")
        }

        if (email.indexOf("@") === -1) {
            throw new InvalidParameterError("Email inválido");
        }
        if (password.length < 10) {
            throw new InvalidParameterError("Senha inválida");
        }

        const role = UserRole.ADMINISTRATOR
        const id = this.idGenerator.generatorId()
        const cryptedPassword = await this.hashManager.hash(password)

        const newUser = new User(id, name, email, nickname, cryptedPassword, stringToUserRole(role))

        await this.userDatabase.createListeningOrAdmnistrationUser(newUser)

        this.authenticator.generateToken({ id, role })
    }

    public async signupBandUser(
        name: string,
        email: string,
        nickname: string,
        password: string,
        description: string
    ) {
        if (!name || !email || !nickname || !password || !description) {
            throw new InvalidParameterError("Preencha os campos para prosseguir.");
        }
        if (email.indexOf("@") === -1) {
            throw new InvalidParameterError("Email inválido");
        }
        if (password.length < 6) {
            throw new InvalidParameterError("Senha inválida");
        }

        const id = this.idGenerator.generatorId()
        const role = UserRole.BAND
        const cryptedPassword = await this.hashManager.hash(password)

        const user = new User(id, name, email, nickname, cryptedPassword, stringToUserRole(role), description)

        await this.userDatabase.createBandUser(user)
    }

    public async login(input: string, password: string) {
        if (!input || !password) {
            throw new InvalidParameterError("Preencha os campos para prosseguir.");
        }

        let user
        if (input.indexOf("@") !== -1) {
            user = await this.userDatabase.getUserByEmail(input)
        } else {
            user = await this.userDatabase.getUserByNickname(input)
        }

        if (!user) {
            throw new NotFoundError("Usuário e/ou senha inválidos.");
        }

        if(user.getIsApproved() === false){
            throw new UnauthorizedError("A banda precisa ser aprovada por um administrador para realizar login.")
        }

        const isPasswordCorrect = await this.hashManager.compare(
            password,
            user.getPassword()
        );

        if (!isPasswordCorrect) {
            throw new InvalidParameterError("Usuário e/ou senha inválidos");
        }

        const accessToken = this.authenticator.generateToken({
            id: user.getId(),
            role: user.getRole(),
        });

        return { accessToken, role: user.getRole(), name: user.getName()  };
    }

    public async getAllBands(token: string) {
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() !== UserRole.ADMINISTRATOR) {
            throw new UnauthorizedError("Você não tem permissão visualizar todos os artistas!")
        }

        const bands = await this.userDatabase.getAllBands()
        
        return bands.map(band => ({
                id: band.getId(),
                name: band.getName(),
                email: band.getEmail(),
                nickname: band.getNickame(),
                isApproved: band.getIsApproved() == true ? true : false
        }))
    }

    public async aproveBand(id: string, token: string) {
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() !== UserRole.ADMINISTRATOR) {
            throw new UnauthorizedError("Você não tem permissão para aprovar artista!")
        }

        const band = await this.userDatabase.getUserById(id)
        if (!band) {
            throw new NotFoundError("Artista não encontrado.");
        }
        if(band.getIsApproved() == true){
            throw new GenericError("Artista já aprovado anteriormente.")
        }       

        await this.userDatabase.approveBand(id)
    }

    public async getAllUsers(token: string) {
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (user.getRole() !== UserRole.ADMINISTRATOR) {
            throw new UnauthorizedError("Você não tem permissão visualizar todos os usuários!")
        }

        const users = await this.userDatabase.getAllUsers()
        
        return users.map(user => ({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                nickname: user.getNickame(),
                isApproved: user.getIsApproved() == true ? true : false,
                role: user.getRole()
        }))
    }

    public async blockUser(id: string, token: string) {
        const userLoggedData = this.authenticator.verify(token)
        const userLogged = await this.userDatabase.getUserById(userLoggedData.id)
        if (!userLogged) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (userLogged.getRole() !== UserRole.ADMINISTRATOR) {
            throw new UnauthorizedError("Você não tem permissão para bloquear usuário!")
        }

        const user = await this.userDatabase.getUserById(id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado.");
        }
        if (user.getRole() === UserRole.ADMINISTRATOR) {
            throw new UnauthorizedError("Você não tem permissão para bloquear um administrador!")
        }
        if(user.getIsApproved() == false){
            throw new GenericError("Este usuário já estava bloqueado.")
        }       

        await this.userDatabase.blockUser(id)
    }

    public async getProfile(token: string){
        const userLoggedData = this.authenticator.verify(token)
        const userLogged = await this.userDatabase.getUserById(userLoggedData.id)
        if (!userLogged) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }

        return {
            id: userLogged.getId(),
            name: userLogged.getName(),
            nickname: userLogged.getNickame(),
            email: userLogged.getEmail(),
            description: userLogged.getDescription(),
            role: userLogged.getRole(),
            isApproved: userLogged.getIsApproved()
        }
        
        return userLogged
    }

    public async changeNameById(name: string, token: string) {
        const userLoggedData = this.authenticator.verify(token)
        const userLogged = await this.userDatabase.getUserById(userLoggedData.id)
        if (!userLogged) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }

        await this.userDatabase.changeNameById(userLogged.getId(), name)
    }


    public async makePremium(id: string, token: string) {
        const userLoggedData = this.authenticator.verify(token)
        const userLogged = await this.userDatabase.getUserById(userLoggedData.id)
        if (!userLogged) {
            throw new NotFoundError("Usuário não encontrado. Realize novo login.");
        }
        if (userLogged.getRole() !== UserRole.ADMINISTRATOR) {
            throw new UnauthorizedError("Você não tem permissão para tornar o usuário premium!")
        }

        const user = await this.userDatabase.getUserById(id)
        if (!user) {
            throw new NotFoundError("Usuário não encontrado.");
        }
        if (user.getRole() === UserRole.ADMINISTRATOR || user.getRole() === UserRole.BAND) {
            throw new UnauthorizedError("Apenas ouvintes podem ser transformados em premium!")
        }
        if(user.getRole() === UserRole.PAYINGLISTENER){
            throw new GenericError("Este usuário já é PREMIUM.")
        }       

        await this.userDatabase.makePremium(id)
    }


}