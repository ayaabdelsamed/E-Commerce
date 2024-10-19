

export class AppError extends Error {
    constructor(message,statusCode){
        super(message) // عايده على ال  error
        this.statusCode = statusCode
    }
}