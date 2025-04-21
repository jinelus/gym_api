import type { CheckInsRepository } from "@/repositories/interfaces/checkins-repository"
import type { CheckIn } from '@prisma/client'
import { CheckInAlreadyExistsError } from "../error/checkin-already-exists"
import { GymsRepository } from "@/repositories/interfaces/gyms-repository"
import { RessourceNotFoundError } from "../error/ressource-not-found-error"
import { getDistanceBetweenCoordinate } from "@/utils/get-distance-via-lat-and-long"
import { TooFarDistanceError } from "../error/too-far-distance-error"

interface CheckinUseCaseProps {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckinUseCaseResponse {
    checkin: CheckIn
}

export class CheckinUseCase {

    constructor(private checkinsRepository: CheckInsRepository, private gymsRepository: GymsRepository) {}

    async execute({ gymId, userId, userLatitude, userLongitude }: CheckinUseCaseProps): Promise<CheckinUseCaseResponse> {

        const gymExists = await this.gymsRepository.findById(gymId)

        if(!gymExists) {
            throw new RessourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinate(
            { latitude: gymExists.latitude.toNumber(), longitude: gymExists.longitude.toNumber() },
            { latitude: userLatitude, longitude: userLongitude }
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if(distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new TooFarDistanceError()
        }

        const checkinOnSameDay = await this.checkinsRepository.findByUserIdOnDate(userId, new Date())

        if(checkinOnSameDay) {
            throw new CheckInAlreadyExistsError()
        }

        const checkin = await this.checkinsRepository.create(userId, gymId)

        return {
            checkin
        }
        
    }

}