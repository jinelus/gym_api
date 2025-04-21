import { CheckInsRepository } from "@/repositories/interfaces/checkins-repository";
import { CheckIn } from "@prisma/client";
import { RessourceNotFoundError } from "../error/ressource-not-found-error";
import { AlreadyValidateCheckinError } from "../error/already-validate-checkin-error";
import dayjs from "dayjs";
import { InvalidateCheckinError } from "../error/invalidate-checkin-error";

interface ValidateCheckinUseCaseParams {
    checkinId: string;
}

interface ValidateCheckinUseCaseResponse {
    checkin: CheckIn
}

export class ValidateCheckinUseCase {
    constructor(private checkinsRepository: CheckInsRepository){}

    async execute({ checkinId }: ValidateCheckinUseCaseParams): Promise<ValidateCheckinUseCaseResponse> {

        const checkin = await this.checkinsRepository.findById(checkinId)

        if(!checkin) {
            throw new RessourceNotFoundError()
        }

        if(checkin.validateAt) {
            throw new AlreadyValidateCheckinError()
        }

        const distanceInMinutes = dayjs(new Date()).diff(dayjs(checkin.createdAt), 'minutes')

        if(distanceInMinutes > 20) {
            throw new InvalidateCheckinError()
        }

        checkin.validateAt = new Date()
        await this.checkinsRepository.save(checkin)


        return { checkin }
    }
}