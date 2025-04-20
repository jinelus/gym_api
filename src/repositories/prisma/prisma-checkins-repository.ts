import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository, PaginationParams } from "../interfaces/checkins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
    async findById(checkInId: string): Promise<CheckIn | null> {
        const checkin = await prisma.checkIn.findUnique({
            where: { id: checkInId }
        });
        
        return checkin ?? null;
    }
    async delete(checkInId: string): Promise<void> {
        await prisma.checkIn.delete({
            where: { id: checkInId }
        })
    }

    async create(userId: string, gymId: string): Promise<CheckIn> {
        const checkin = await prisma.checkIn.create({
            data: {
                gymId: gymId,
                userId: userId,
            }
        })

        return checkin
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkInOnSameDay = await prisma.checkIn.findFirst({
            where: {
                userId,
                createdAt: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate(),
                }
            }
        })

        return checkInOnSameDay ?? null
    }

    async findAllByUserId(userId: string, { page }: PaginationParams): Promise<CheckIn[]> {
        const checkins = await prisma.checkIn.findMany({
            where: {
                userId,
            },
            take: 20,
            skip: (page - 1) * 20,
        })

        return checkins
    }
    

}