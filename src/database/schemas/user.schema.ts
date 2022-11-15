import AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Entity, Table } from 'dynamodb-toolbox';

const Client = new DocumentClient({
    // Specify your client options as usual
    convertEmptyValues: false,
    accessKeyId: 'AKIAU26KE5KVULHYCIXW',
    secretAccessKey: 'EgidoJEPW3qwFM/w0/rZygbg5NguOGjhJJWKJJxl',
    region: 'ap-southeast-1',
  })

export const Collection = new Table({
    name: 'Users',
    partitionKey: 'pk',
    DocumentClient: Client 
})


export const User = new Entity({
    name: 'Users',
    
    attributes: {
        id: { partitionKey: true},
        // sk: { hidden: true, sortKey: true },
        email: { type: 'string', required: true },
        username: { type: 'string', required: true },
        phoneNumber: { type: 'string', required: true },
        age: { type: 'number', required: true },
        address: { type: 'string', required: true },
    },

    table: Collection
} as const)

