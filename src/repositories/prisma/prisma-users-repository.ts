import type { Prisma, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import type { UsersRepository } from "../interfaces/users-repository";
import type { EditUserUseCaseProps } from "@/uses-cases/edit-user";

export class PrismaUsersRepository implements UsersRepository {
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!user) {
            return null
        }

        return user
    }
    async create({
        email,
        gymId,
        name,
        password
    }: Prisma.UserUncheckedCreateInput) {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                gymId
            }
        })

        return user
    }

    async findUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            return null
        }

        return user
    }

    async update({ email, gymId, name, userId}: EditUserUseCaseProps): Promise<User> {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name,
                email,
                gymId
            }
        })

        return user
    }
}