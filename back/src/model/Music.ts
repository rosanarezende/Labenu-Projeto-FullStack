export class Music {
    constructor(
        private id: string,
        private name: string,
        private albumId: string,
    ) { }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getAlbumId(): string {
        return this.albumId;
    }

}