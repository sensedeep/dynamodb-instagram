/*
    OneTable Setup
*/

import { Entity, Model, Table } from '../../onetable/src/index';
// import { Entity, Model, Table } from 'dynamodb-onetable'
import { Indexes, Models, Schema } from './Schema.js'
import { getClient } from './client'

const OneTable = new Table({
    name: 'Instagram',          //  process.env.TABLE_NAME,
    client: getClient(),
    logger: true,
    schema: Schema,
    uuid: 'ulid',
})

export {Entity, Indexes, Model, Models, OneTable, Schema}
