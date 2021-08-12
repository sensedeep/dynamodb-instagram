import { Entity, Model, Models, OneTable } from '../connect'

export type User = Entity<typeof Models.User>

class UserClass extends Model<User> {
    constructor() {
        super(OneTable, 'User')
    }
}

export const UserModel = new UserClass()
