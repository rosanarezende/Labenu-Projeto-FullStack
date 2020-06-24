export class Album {
    constructor(
        private id: string,
        private bandId: string,
        private name: string,
    ) { }

    public getId(): string {
        return this.id;
    }

    public getBandId(): string {
        return this.bandId;
    }

    public getName(): string {
        return this.name;
    }
}