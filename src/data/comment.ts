import { Entity, Model, Models, OneTable } from "../connect"
import { PhotoModel } from "./photo"

export type Comment = Entity<typeof Models.Comment>

class CommentClass extends Model<Comment> {
    constructor() {
        super(OneTable, 'Comment')
    }

    async commentOnPhoto(photoId: string, commentingUsername: string, content: string): Promise<Comment> {
        const transaction = {}
        const comment = await this.create({commentingUsername, photoId, content}, {transaction})
        await PhotoModel.update({username: commentingUsername}, {add: {commentCount: 1}, transaction})
        await OneTable.transact('write', {transaction})
        return comment
    }

    async listCommentsForPhoto(photoId: string): Promise<Comment[]> {
        return await this.find({photoId}, {reverse: true})
    }
}

export const CommentModel = new CommentClass()
