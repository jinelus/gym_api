import type { CheckInsRepository } from "@/repositories/interfaces/checkins-repository"
import type { CheckIn } from '@prisma/client'

interface FetchAllCheckinsProps {
    userId: string
    page?: number
}

interface FetchAllCheckinsResponse {
    checkins: CheckIn[]
}

export class FetchAllCheckins {

    constructor(private checkinsRepository: CheckInsRepository) {}

    async execute({ userId, page = 1 }: FetchAllCheckinsProps): Promise<FetchAllCheckinsResponse> {

        const checkins = await this.checkinsRepository.findAllByUserId(userId, { page })

        return {
            checkins
        }
        
    }

}