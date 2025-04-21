
export class InvalidateCheckinError extends Error {
    constructor() {
        super('Check-in already validated.')
    }
}