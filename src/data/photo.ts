import { Entity, Model, Models, OneTable } from '../connect'

export type Photo = Entity<typeof Models.Photo>

class PhotoClass extends Model<Photo> {
    constructor() {
        super(OneTable, 'Photo')
    }
}

export const PhotoModel = new PhotoClass()
