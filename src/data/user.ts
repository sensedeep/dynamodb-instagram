import { Entity, Model, Models, OneTable } from '../connect'

/*
    Create a typed User based on the OneTable schema User entity
*/
export type User = Entity<typeof Models.User>

/*
    The UserClass provides create, get, find, remove and update methods
*/
class UserClass extends Model<User> {
    constructor() {
        /*
            The OneTable instance is configured (via ./connect) to talk to DynamoDB
        */
        super(OneTable, 'User')
    }
    //  Add custom User methods here
}

/*
    Export a singleton model to interact with Users in DynamoDB
*/
export const UserModel = new UserClass()
