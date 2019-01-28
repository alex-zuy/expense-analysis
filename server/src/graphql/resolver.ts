import {GraphQLResolveInfo} from 'graphql';
import {IFieldResolver} from 'graphql-tools';
import {ApplicationServices} from '../appConfig/createServices';
import User from '../entities/User';

export interface ResolverContext {
    currentUser: User,
    services: ApplicationServices
}

//TODO: ResultType is unused
export interface ResolverFunc<ResultType, ParentObjType = undefined, FieldArgsType = {}>
    extends IFieldResolver<ParentObjType, ResolverContext, FieldArgsType> {}
