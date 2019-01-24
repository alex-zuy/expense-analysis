import {Overwrite} from 'utility-types';
import {PickByValue} from 'utility-types/dist/mapped-types';
import {ResolverFunc} from './resolver';

const NODE_TYPE_AND_ID_SEPARATOR = '__';

export const parseNodeId = (nodeId: string) => {
    const [typeName, idStr] = nodeId.split(NODE_TYPE_AND_ID_SEPARATOR);
    return {
        typeName,
        id: Number(idStr)
    }
};

export const composeNodeId = (entity: {id: number}): string =>
    [entity.constructor.name, entity.id].join(NODE_TYPE_AND_ID_SEPARATOR);

export const nodeIdResolver: ResolverFunc<string, {id: number}> = (obj) =>
    composeNodeId(obj);
