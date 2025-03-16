import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../interfaces/users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = []
    async create(user: Prisma.UserUncheckedCreateInput): Promise<User> {

        const userCreated: User = {
            id: randomUUID(),
            name: user.name,
            email: user.email,
            password: user.password,
            gymId: user.gymId,
            role: user.role ?? 'MEMBER',
            createdAt: new Date(),
            updatedAt: null
        }

        this.users.push(userCreated)

        return userCreated
    }
    async findUserByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email)

        return user ?? null
    }
    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id)

        return user ?? null
    }
    
    
}