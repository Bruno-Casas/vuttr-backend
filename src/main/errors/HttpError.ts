
export class HttpError extends Error {
    public httpCode: number
    constructor (message: string, httpCode: number) {
      super(message)
      this.httpCode = httpCode
    }
}
