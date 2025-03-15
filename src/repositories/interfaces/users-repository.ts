import type { Prisma, User } from "@prisma/client";

export interface UsersRepository {
    create(user: Prisma.UserUncheckedCreateInput): Promise<void>
    findUserByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
}