export class UserResource {
    public id: string;
    public username: string;
    public role: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(username: string, role: string, id?: string) {
        this.id = id || '';
        this.username = username;
        this.role = role;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
