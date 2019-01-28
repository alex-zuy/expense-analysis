import {ResolverFunc} from './resolver';

const NODE_TYPE_AND_ID_SEPARATOR = '__';

export const parseNodeId = (nodeId: string) => {
    const [typeName, idStr] = nodeId.split(NODE_TYPE_AND_ID_SEPARATOR);
    return {
        typeName,
        id: Number(idStr)
    }
};

export const composeNodeId = (typeName: string, id: number) =>
    [typeName, id].join(NODE_TYPE_AND_ID_SEPARATOR);

export const nodeIdResolver: ResolverFunc<string, {id: number}> = (obj) =>
    composeNodeId(obj.constructor.name, obj.id);
