import type { CheckIn } from "@prisma/client";

export interface PaginationParams {
    page: number
}

export interface CheckInsRepository {
    create(userId: string, gymId: string): Promise<CheckIn>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    findAllByUserId(userId: string, { page }: PaginationParams): Promise<CheckIn[]>
    findById(checkInId: string): Promise<CheckIn | null>
    delete(checkInId: string): Promise<void>
    save(checkIn: CheckIn): Promise<void>
}