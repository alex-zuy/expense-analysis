import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import {buildSchema} from 'graphql';

const fsReadFile = util.promisify(fs.readFile);

export const createGraphQlSchema = async () => {
    const schemaFilePath = path.join(__dirname, '../root.graphqls');
    const buffer = await fsReadFile(schemaFilePath, null);
    return buildSchema(buffer.toString('UTF-8'));
};
