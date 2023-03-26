export class KKChat {
    public senderId?: string | null
    public recipientId?: string | null
    public timestamp?: any
    public messages?: [] | null
    public isOnlyKnock: boolean

    constructor(c: KKChat) {
        this.senderId= c.senderId
        this.recipientId= c.recipientId
        this.timestamp= c.timestamp
        this.messages= c.messages || null
        this.isOnlyKnock = c.isOnlyKnock || false
    }
}