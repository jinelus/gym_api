import type { EditUserUseCaseProps } from "@/uses-cases/edit-user";
import type { Prisma, User } from "@prisma/client";

export interface UsersRepository {
    create(user: Prisma.UserUncheckedCreateInput): Promise<User>
    findUserByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    update(user: EditUserUseCaseProps): Promise<User>
    delete(userId: string): Promise<void>
}