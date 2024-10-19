export class UserInfo {
    public readonly id: string;
    public readonly email: string;
    public readonly name: string;
    public readonly givenName: string;
    public readonly familyName: string;

    constructor(id: string, email: string, name: string, givenName: string, familyName: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.givenName = givenName;
        this.familyName = familyName;
    }
}
