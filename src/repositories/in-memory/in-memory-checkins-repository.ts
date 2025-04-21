import type { CheckIn } from "@prisma/client"
import type { CheckInsRepository, PaginationParams } from "../interfaces/checkins-repository"
import dayjs from "dayjs"

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async create(userId: string, gymId: string) {

        const checkin: CheckIn = {
            id: 'checkin-1',
            gymId: gymId,
            userId: userId,
            createdAt: new Date(),
            validateAt: null,
        }

        this.items.push(checkin)

        return checkin
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkinOnSameDay = this.items.find((checkin) => {

            const checkInDate = dayjs(checkin.createdAt)
            const isOnSameDay = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkin.userId === userId && isOnSameDay
        })
        
        return checkinOnSameDay ?? null
    }

    async delete(checkInId: string): Promise<void> {
        this.items = this.items.filter(checkin => checkin.id !== checkInId);
    }

    async findAllByUserId(userId: string, { page }: PaginationParams): Promise<CheckIn[]> {
        const checkins = this.items.filter(checkin => checkin.userId === userId)
            .slice((page - 1) * 20, page * 20)

        return checkins
    }

    async findById(checkInId: string): Promise<CheckIn | null> {
        const checkin = this.items.find(checkin => checkin.id === checkInId)

        return checkin ?? null
    }

    async save(checkIn: CheckIn): Promise<void> {
        const checkinIndex = this.items.findIndex(item => item.id === checkIn.id)

        if (checkinIndex >= 0) {
            this.items[checkinIndex] = checkIn
        }
    }
}