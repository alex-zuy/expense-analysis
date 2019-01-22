import {ApplicationServices} from '../appConfig/createServices';

export interface ResolverContext {
    services: ApplicationServices
}

export interface ResolverFunc<ResultType, ParentObjType = null, FieldArgsType = {}> {
    (parent: ParentObjType, context: ResolverContext, args: FieldArgsType): ResultType | Promise<ResultType>
}

export interface MemberResolverFunc<ResultType, ParentObjType = null, FieldArgsType = {}> {
    (this: ParentObjType, context: ResolverContext, args: FieldArgsType): ResultType | Promise<ResultType>
}
