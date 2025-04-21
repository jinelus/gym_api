import { Gym } from "@prisma/client";
import { GymsRepositorParams, GymsRepository } from "../interfaces/gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { getDistanceBetweenCoordinate } from "@/utils/get-distance-via-lat-and-long";


export class InMemoryGymsRepository implements GymsRepository {
    fyndByName(query: string, page: number): Promise<Gym[]> {
        throw new Error("Method not implemented.");
    }
    public items: Gym [] = []

    async create(data: GymsRepositorParams): Promise<Gym> {
        const gym: Gym = {
            id: 'gym-1',
            name: data.name,
            description: data.description || null,
            phone: data.phone || null,
            latitude: new Decimal(data.latitude),
            longitude: new Decimal(data.longitude),
        }

        this.items.push(gym)

        return gym
    }

    async findById(id: string): Promise<Gym | null> {
        const gym = this.items.find(gym => gym.id === id)

        if(!gym) {
            return null
        }

        return gym
    }

    async findByName(query: string, page: number): Promise<Gym[]> {
        const gyms = this.items.filter(gym => {
            return gym.name.toLowerCase().includes(query.toLowerCase())
        }).slice((page - 1) * 20, page * 20)

        return gyms
    }

    async findManyNearby({ latitude: userLatitude, longitude: userLongitude, page }: { latitude: number; longitude: number; page: number }): Promise<Gym[]> {
        const gyms = this.items.filter(gym => {
            const distance = getDistanceBetweenCoordinate(
                { latitude: userLatitude, longitude: userLongitude },
                { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
            )

            return distance < 10
        }).slice((page - 1) * 20, page * 20)

        return gyms
    }

}