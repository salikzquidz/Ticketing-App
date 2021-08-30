export class DatabaseConnectionError extends Error {
    reason = 'Error connecting to database'
    statusCode = 500;
    constructor(){
        super()
        
        // Only because we are extending built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
    serializeError(){
        return {
            errors : [
                {
                    message : this.reason,
                    statusCode : this.statusCode
                }
            ]
        }
    }
}