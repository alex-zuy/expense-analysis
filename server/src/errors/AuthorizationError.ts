export default class AuthorizationError implements Error {

    readonly message: string;

    readonly name: string;

    constructor(message: string) {
        const error = Error(message);
        copyOwnPropertiesFrom(this, error);
    }
}

AuthorizationError.prototype = Object.create(Error.prototype);
AuthorizationError.prototype.constructor = AuthorizationError;

const copyOwnPropertiesFrom = (target: object, source: object) => {
    Object.getOwnPropertyNames(source)
        .forEach(function(propKey) {
            const desc = Object.getOwnPropertyDescriptor(source, propKey);
            Object.defineProperty(target, propKey, desc!);
        });
    return target;
};
