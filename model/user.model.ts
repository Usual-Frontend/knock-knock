export class KKUser {

    public uid?:string | null
    public displayName?:string | null
    public email?: string | null
    public emailVerified?: boolean
    public isAnonymous?: boolean
    public at_leisure?: boolean
    [key:string]: any

    constructor(u: KKUser) {
        this.uid = u.uid
        this.displayName = u.displayName || u.email
        this.email = u.email
        this.emailVerified = u.emailVerified
        this.isAnonymous = u.isAnonymous
        this.at_leisure = u.at_leisure
    }
}
