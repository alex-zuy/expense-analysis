import * as fs from 'fs';
import {makeExecutableSchema} from 'graphql-tools';
import * as path from 'path';
import * as util from 'util';
import resolvers from '../graphql/rootResolvers';

const fsReadFile = util.promisify(fs.readFile);

export const createSchema = async () => {
    const schemaFilePath = path.join(__dirname, '../root.graphql');
    const buffer = await fsReadFile(schemaFilePath, null);
    const source = buffer.toString('UTF-8');
    return makeExecutableSchema({typeDefs: source, resolvers});
};
