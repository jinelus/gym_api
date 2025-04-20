import type { CheckInsRepository } from "@/repositories/interfaces/checkins-repository"
import type { CheckIn } from '@prisma/client'
import { CheckInAlreadyExistsError } from "../error/checkin-already-exists"
import { GymsRepository } from "@/repositories/interfaces/gyms-repository"
import { RessourceNotFoundError } from "../error/ressource-not-found-error"

interface CheckinUseCaseProps {
    userId: string
    gymId: string
}

interface CheckinUseCaseResponse {
    checkin: CheckIn
}

export class CheckinUseCase {

    constructor(private checkinsRepository: CheckInsRepository, private gymsRepository: GymsRepository) {}

    async execute({ gymId, userId }: CheckinUseCaseProps): Promise<CheckinUseCaseResponse> {

        const gymExists = await this.gymsRepository.findById(gymId)

        if(!gymExists) {
            throw new RessourceNotFoundError()
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