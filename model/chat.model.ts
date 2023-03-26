export class KnockMessage {
    public senderId?: string | null
    public recipientId?: string | null
    public timestamp?: any
    public isOnlyKnock: boolean

    constructor(c: KnockMessage) {
        this.senderId= c.senderId
        this.recipientId= c.recipientId
        this.timestamp= c.timestamp
        this.isOnlyKnock = c.isOnlyKnock || false
    }
}