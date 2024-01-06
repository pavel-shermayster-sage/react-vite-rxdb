import { createRxDatabase } from 'rxdb';
import {getRxStorageMemory} from "rxdb/plugins/storage-memory";

const myDatabase = await createRxDatabase({
    name: 'mydatabase',
    storage: getRxStorageMemory()
});

const todoSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        name: {
            type: 'string'
        },
        done: {
            type: 'boolean'
        },

    },
    required: ['id', 'name', 'done']
}


const collections =  await myDatabase.addCollections({
    todos: {
        schema: todoSchema
    }
});

export { myDatabase, collections}

