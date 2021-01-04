
export class HttpError extends Error {
    public httpCode: number
    public details: object
    constructor (message: string, httpCode: number) {
      super(message)
      this.httpCode = httpCode || 500
    }

    setMessage (message:string) {
      this.message = message
    }

    setDetails (details:object) {
      this.details = details
    }

    setCode (httpCode:number) {
      this.httpCode = httpCode
    }
}
