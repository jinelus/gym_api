import { Gym } from "@prisma/client"

export interface GymsRepositorParams {
    name: string
    description?: string
    phone?: string
    latitude: number
    longitude: number
}

export interface GymsRepository {
    create(data: GymsRepositorParams): Promise<Gym>
    findById(id: string): Promise<Gym | null>
    findByName(query: string, page: number): Promise<Gym[]>
    findManyNearby(params: { latitude: number; longitude: number; page: number }): Promise<Gym[]>
}