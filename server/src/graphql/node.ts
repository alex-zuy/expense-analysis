import {Overwrite} from 'utility-types';
import {PickByValue} from 'utility-types/dist/mapped-types';

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

type SimplePropTypes = string | number | boolean | Date;

type PickSimpleProps<T> = PickByValue<T, SimplePropTypes>;

export interface NodeId {
    id: string;
}

type SimplePropertiesAndNodeId<EntityType> = Overwrite<PickSimpleProps<EntityType>, NodeId>;

export type EntityNode<EntityType, ExtraResolvers = {}> = SimplePropertiesAndNodeId<EntityType> & ExtraResolvers;

export const pickSimpleEntityProps = <E>(entity: {id: number} & E): SimplePropertiesAndNodeId<E> => {
    const {id, ...rest} = entity as any;

    const simpleProps = Object.entries(rest)
        .filter(([, value]) => isSimpleProp(value))
        .reduce(
            (res, [key, value]) => ({...res, [key]: value}),
            {}
        );

    return {
        id: composeNodeId(entity),
        ...simpleProps
    } as any;
};

const isSimpleProp = (value: any) => {
    const primitiveTypeNames = [typeof '', typeof 1, typeof true];
    return primitiveTypeNames.includes(typeof value) || value instanceof Date;
};
