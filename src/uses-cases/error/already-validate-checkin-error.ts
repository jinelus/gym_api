
export class AlreadyValidateCheckinError extends Error {
    constructor() {
        super("Check-in already validated.")
    }
}