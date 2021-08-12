import { Entity, Model, Models, OneTable } from '../connect'
import { User, UserModel } from "./user"

export type Follow = Entity<typeof Models.Follow>

class FollowClass extends Model<Follow> {
    constructor() {
        super(OneTable, 'Follow')
    }

    async followUser(followedUsername: string, followingUsername: string) {
        const transaction = {}
        const follow = await this.create({followedUsername, followingUsername}, {transaction})
        await UserModel.update({username: followedUsername},  {add: {followingCount: 1}, transaction})
        await UserModel.update({username: followingUsername}, {add: {followerCount: 1}, transaction})
        await OneTable.transact('write', transaction)
        return follow
    }

    async listFollowersOfUser(username: string): Promise<User[]> {
        const follows = await this.find({followedUsername: username})
        const batch = {}
        for (let follow of follows) {
            await UserModel.get({username: follow.followingUsername}, {batch})
        }
        return await OneTable.batchGet(batch, {parse: true})
    }

    async listFollowedByUser(username: string): Promise<User[]> {
        const following = await this.find({followingUsername: username}, {index: 'gs1'})
        const batch = {}
        for (let follow of following) {
            await UserModel.get({username: follow.followedUsername}, {batch})
        }
        return await OneTable.batchGet(batch, {parse: true})
    }
}

export const FollowModel = new FollowClass()
