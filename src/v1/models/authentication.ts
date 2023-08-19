export interface User {
    _id?:string,
    email?:string,
    password:string,
    username:string,
    profileImage?:string
}

export interface Auth {
    token:string,
    userId:string
}