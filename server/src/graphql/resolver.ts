import {GraphQLResolveInfo} from 'graphql';
import {ApplicationServices} from '../appConfig/createServices';

export interface ResolverContext {
    services: ApplicationServices
}

export interface ResolverFunc<ResultType, ParentObjType = undefined, FieldArgsType = {}> {
    (
        this: ParentObjType,
        args: FieldArgsType,
        context: ResolverContext,
        info: GraphQLResolveInfo
    ): ResultType | Promise<ResultType>
}
