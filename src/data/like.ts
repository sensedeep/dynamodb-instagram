import { Entity, Model, Models, OneTable } from '../connect'
import { PhotoModel } from "./photo"

export type Like = Entity<typeof Models.Like>

export class LikeClass extends Model<Like> {
    constructor() {
        super(OneTable, 'Like')
    }

    //  MOB rename like
    async likePhoto(photoId: string, likingUsername: string): Promise<Like> {
        const transaction = {}
        const like = await LikeModel.create({likingUsername, photoId}, {transaction})
        await PhotoModel.update({username: likingUsername}, {add: {likesCount: 1}, transaction})
        await OneTable.transact('write', transaction)
        return like
    }

    //  MOB rename list
    async listLikesForPhoto(photoId: string): Promise<Like[]> {
        return LikeModel.find({photoId}, {index: 'gs1', reverse: true})
    }
}

export const LikeModel = new LikeClass()
