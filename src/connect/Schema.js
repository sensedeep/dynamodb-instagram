/*
    Schema.js - SenseDeep DynamoDB schema
 */
const Match = {
    email:       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name:        /^[^<>~`!@#$%^&\*(){}\[\]|\\\/:;,?=+]+$/,
    uuid:        /^[0-9A-F]{32}$/i,
    ulid:        /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/,
    url:         /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
}
    
export const Schema = {
    indexes: {
        primary: {
            hash: 'pk',
            sort: 'sk',
            description: 'Primary index',
        },
        gs1: {
            hash: 'gs1pk',
            sort: 'gs1sk',
            description: 'General secondary index',
            project: 'all',
        }
    },
    models: {
        Comment: {
            pk:                 { type: String, value: 'PC#${photoId}' },
            sk:                 { type: String, value: 'COMMENT#${commentId}' },
            commentingUsername: { type: String, required: true },
            commentId:          { type: String, required: true, uuid: true },
            content:            { type: String, required: true },
            photoId:            { type: String, required: true, validate: Match.ulid },
        },

        Follow: {
            pk:                 { type: String, value: 'FOLLOW#${followedUsername}' },
            sk:                 { type: String, value: 'FOLLOW#${followingUsername}' },
            followedUsername:   { type: String, required: true },
            followingUsername:  { type: String, required: true },

            gs1pk:              { type: String, value: 'FOLLOW#${followingUsername}' },
            gs1sk:              { type: String, value: 'FOLLOW#${followedUsername}' },
        },

        Like: {
            pk:                 { type: String, value: 'PL#${photoId}' },
            sk:                 { type: String, value: 'LIKE#${likingUsername}' },
            likingUsername:     { type: String, required: true },
            photoId:            { type: String, required: true, validate: Match.ulid },
            likeId:             { type: String, required: true, uuid: true, validate: Match.ulid },

            gs1pk:              { type: String, value: 'PL#${photoId}' },
            gs1sk:              { type: String, value: 'LIKE#${likeId}' },
        },

        Photo: {
            pk:                 { type: String, value: 'UP#${username}' },
            sk:                 { type: String, value: 'PHOTO#${photoId}' },
            commentCount:       { type: Number, required: true },
            likesCount:         { type: Number, required: true },
            photoId:            { type: String, required: true, uuid: true, validate: Match.ulid },
            url:                { type: String, required: true, validate: Match.url },
            username:           { type: String, required: true, validate: Match.username },
        },

        User: {
            pk:                 { type: String, value: 'USER#${username}' },
            sk:                 { type: String, value: 'USER#${username}' },
            followerCount:      { type: Number, required: true, default: 0 },
            followingCount:     { type: Number, required: true, default: 0},
            name:               { type: String, required: true, validate: Match.name },
            username:           { type: String, required: true, validate: Match.username },
        },
    }
}

const Indexes = Schema.indexes, Models = Schema.models

export {Indexes, Models}
