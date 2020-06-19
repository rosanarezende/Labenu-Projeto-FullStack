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

    //1 
    public async signupListeningUser(
        name: string,
        email: string,
        nickname: string,
        password: string,
        role: string
    ) {
        if (!name || !email || !nickname || !password || !role) {
            throw new InvalidParameterError("Missing input");
        }

        if (email.indexOf("@") === -1) {
            throw new InvalidParameterError("Invalid email");
        }

        if (password.length < 6) {
            throw new InvalidParameterError("Invalid password");
        }

        const id = this.idGenerator.generatorId()

        const cryptedPassword = await this.hashManager.hash(password)

        const user = new User(id, name, email, nickname, cryptedPassword, stringToUserRole(role))

        await this.userDatabase.createListeningOrAdmnistrationUser(user)

        const accessToken = this.authenticator.generateToken({ id, role })

        return { accessToken, role: user.getRole(), name: user.getName() }
    }

    //2
    public async signupAdministratorUser(
        name: string,
        email: string,
        nickname: string,
        password: string,
        token: string
    ) {
        if (!name || !email || !nickname || !password || !token) {
            throw new InvalidParameterError("Missing input");
        }

        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("User not found");
        }
        if (user.getRole() !== UserRole.ADMINISTRATOR) {
            throw new UnauthorizedError("You must be an admin to access this endpoint")
        }

        if (email.indexOf("@") === -1) {
            throw new InvalidParameterError("Invalid email");
        }

        if (password.length < 10) {
            throw new InvalidParameterError("Invalid password");
        }

        const role = UserRole.ADMINISTRATOR
        const id = this.idGenerator.generatorId()
        const cryptedPassword = await this.hashManager.hash(password)

        const newUser = new User(id, name, email, nickname, cryptedPassword, stringToUserRole(role))

        await this.userDatabase.createListeningOrAdmnistrationUser(newUser)

        // const accessToken = 
        this.authenticator.generateToken({ id, role })

        // nem precisaria devolver, pois ele só cria, não se loga nesse momento
        // return { accessToken, role: user.getRole(), name: user.getName() }
    }

    //3
    public async signupBandUser(
        name: string,
        email: string,
        nickname: string,
        password: string,
        description: string
    ) {
        if (!name || !email || !nickname || !password || !description) {
            throw new InvalidParameterError("Missing input");
        }

        if (email.indexOf("@") === -1) {
            throw new InvalidParameterError("Invalid email");
        }

        if (password.length < 6) {
            throw new InvalidParameterError("Invalid password");
        }

        const id = this.idGenerator.generatorId()
        const role = UserRole.BAND
        const cryptedPassword = await this.hashManager.hash(password)

        const user = new User(id, name, email, nickname, cryptedPassword, stringToUserRole(role), description)

        await this.userDatabase.createBandUser(user)
    }

    //4
    public async getAllBands(token: string) {
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("User not found");
        }
        if (user.getRole() !== UserRole.ADMINISTRATOR) {
            throw new UnauthorizedError("You must be an admin to access this endpoint")
        }

        const bands = await this.userDatabase.getAllBands()
        
        return bands.map(band => {
            const isApproved = band.getIsApproved() == true ? true : false
            return {
                name: band.getName(),
                email: band.getEmail(),
                nickname: band.getNickame(),
                isApproved: isApproved
            }
        }
        )
    }

    //5
    public async aproveBand(id: string, token: string) {
        const userData = this.authenticator.verify(token)
        const user = await this.userDatabase.getUserById(userData.id)
        if (!user) {
            throw new NotFoundError("User not found");
        }
        if (user.getRole() !== UserRole.ADMINISTRATOR) {
            throw new UnauthorizedError("You must be an admin to access this endpoint")
        }

        const band = await this.userDatabase.getUserById(id)
        if (!band) {
            throw new NotFoundError("Band not found");
        }
        if(band.getIsApproved() == true){
            throw new GenericError("Band already approved")
        }       

        await this.userDatabase.approveBand(id)
    }


    //6
    public async login(input: string, password: string) {
        if (!input || !password) {
            throw new InvalidParameterError("Missing input");
        }

        let user
        if (input.indexOf("@") !== -1) {
            user = await this.userDatabase.getUserByEmail(input)
        } else {
            user = await this.userDatabase.getUserByNickname(input)
        }

        if (!user) {
            throw new NotFoundError("User not found");
        }

        if(user.getIsApproved() == false){
            throw new UnauthorizedError("The band needs to be approved by an administrator to login")
        }

        const isPasswordCorrect = await this.hashManager.compare(
            password,
            user.getPassword()
        );

        if (!isPasswordCorrect) {
            throw new InvalidParameterError("Invalid password");
        }

        const accessToken = this.authenticator.generateToken({
            id: user.getId(),
            role: user.getRole(),
        });

        const userInformation = {
            role: user.getRole(), 
            name: user.getName()
        }

        return { accessToken, role: user.getRole(), name: user.getName()  };
    }



}