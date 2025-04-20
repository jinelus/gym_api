
export class CheckInAlreadyExistsError extends Error {
    constructor() {
        super('You can only check in once a day')
    }
}