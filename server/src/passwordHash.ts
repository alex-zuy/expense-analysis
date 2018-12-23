import * as crypto from "crypto";

export interface PasswordHashFunction {
    (rawPassword: string): Promise<string>;
}

//TODO: replace with B-Crypt based implementation
export const passwordHashFunction: PasswordHashFunction =
    async (rawPassword) =>
        crypto.createHash('md5').update(rawPassword).digest('hex');
