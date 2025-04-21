
export class TooFarDistanceError extends Error {
    constructor() {
        super('You are too far from the gym to check in.')
    }
}