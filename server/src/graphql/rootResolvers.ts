import {ApplicationServices} from '../appConfig/createServices';
import User from '../entities/User';

export interface ResolverContext {
    services: ApplicationServices
}

interface ResolverFunc<ResultType, ParentObjType = null, FieldArgsType = {}> {
    (parent: ParentObjType, context: ResolverContext, args: FieldArgsType): ResultType | Promise<ResultType>
}

const self: ResolverFunc<User> = (obj, {services}, args) => {
    return services.usersService.getCurrentUser();
};

export default {
    self
};
