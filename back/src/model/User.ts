import { InvalidParameterError } from "../errors/InvalidParameterError";

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private nickname: string,
        private password: string,
        private role: UserRole,
        private description?: string,
        private isApproved?: boolean
    ) { }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getNickame(): string {
        return this.nickname;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRole(): UserRole {
        return this.role;
    }

    public getDescription(): string {
        return this.description as string;
    }

    public getIsApproved(): boolean {
        return this.isApproved as boolean;
    }
}

export enum UserRole {
    BAND = "BAND",
    PAYINGLISTENER = "PAYING-LISTENER",
    NONPAYINGLISTENER = "NON-PAYING-LISTENER",
    ADMINISTRATOR = "ADMINISTRATOR"
}

export const stringToUserRole = (input: string): UserRole => {
    switch (input) {
        case "BAND":
            return UserRole.BAND;
        case "PAYING-LISTENER":
            return UserRole.PAYINGLISTENER;
        case "NON-PAYING-LISTENER":
            return UserRole.NONPAYINGLISTENER;
        case "ADMINISTRATOR":
            return UserRole.ADMINISTRATOR;
        default:
            throw new InvalidParameterError("Invalid user role");
    }
};