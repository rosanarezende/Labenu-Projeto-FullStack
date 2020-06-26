export class Playlist {
    constructor(
        private id: string,
        private name: string,
        private userId: string,
        private collaborative?: boolean
    ) { }

    public getId(): string {
        return this.id;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getName(): string {
        return this.name;
    }

    public getCollaborative(): boolean {
        return this.collaborative as boolean;
    }

}