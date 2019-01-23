import * as fs from 'fs';
import {buildSchema, GraphQLSchema} from 'graphql';
import {GraphQLDate} from 'graphql-iso-date';
import * as path from 'path';
import * as util from 'util';

const fsReadFile = util.promisify(fs.readFile);

export const createSchema = async () => {
    const schemaFilePath = path.join(__dirname, '../root.graphql');
    const buffer = await fsReadFile(schemaFilePath, null);
    const schema = buildSchema(buffer.toString('UTF-8'));
    registerCustomTypes(schema);
    return schema;
};

const registerCustomTypes = (schema: GraphQLSchema) => {
    Object.assign(schema.getTypeMap(), {
        Date: GraphQLDate
    });
};
