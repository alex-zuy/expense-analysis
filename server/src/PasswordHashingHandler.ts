import * as bcrypt from 'bcrypt';

export interface PasswordHashingHandler {

    calculatePasswordHash(rawPassword: string): Promise<string>;

    compareRawWithHash({raw, hash}: {raw: string, hash: string}): Promise<boolean>;

}

export class BcryptPasswordHashingHandler implements PasswordHashingHandler {

    private readonly saltRounds: number;

    constructor(saltRounds: number = 10) {
        this.saltRounds = saltRounds;
    }

    calculatePasswordHash(rawPassword: string): Promise<string> {
        return bcrypt.hash(rawPassword, this.saltRounds);
    }

    compareRawWithHash({raw, hash}: { raw: string; hash: string }): Promise<boolean> {
        return bcrypt.compare(raw, hash);
    }
}
