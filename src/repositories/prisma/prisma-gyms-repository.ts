import { prisma } from "@/lib/prisma";
import { GymsRepository } from "../interfaces/gyms-repository";
import { Gym, Prisma } from "@prisma/client";


export class PrismaGymsRepository implements GymsRepository {

    async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
        const gym = await prisma.gym.create({
            data: {
                name: data.name,
                description: data.description || null,
                phone: data.phone || null,
                latitude: data.latitude,
                longitude: data.longitude,
            }
        })

        return gym
    }

    async findById(id: string): Promise<Gym | null> {
        const gym = await prisma.gym.findUnique({
            where: {
                id
            }
        })

        return gym ?? null
    }

    async findByName(query: string, page: number): Promise<Gym[]> {
        const gyms = await prisma.gym.findMany({
            where: {
                name: {
                    contains: query,
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return gyms
    }
}