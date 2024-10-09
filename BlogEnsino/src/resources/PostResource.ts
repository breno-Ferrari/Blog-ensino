export class PostResource {
    public id: string;
    public title: string;
    public text: string;
    public user_id: string;
    public updateBy: string;
    public createdAt: Date;
    public updatedAt: Date;


    constructor(title: string, text: string, user_id: string, id?: string, updateBy?: string) {
        this.id = id || '';
        this.title = title;
        this.text = text;
        this.user_id = user_id;
        this.updateBy = updateBy || "";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
