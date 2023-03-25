export interface IUSER {
    uid?:string | null
    displayName?:string | null,
    emailVerified?: boolean
    isAnonymous?: boolean
}