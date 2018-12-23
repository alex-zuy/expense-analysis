import {Repository} from 'typeorm';
import User from '../entities/User';
import {PasswordHashingHandler} from '../PasswordHashingHandler';

export default class AuthenticationService {

    private readonly userRepository: Repository<User>;

    private readonly passwordHashingHandler: PasswordHashingHandler;

    constructor(userRepository: Repository<User>, passwordHashingHandler: PasswordHashingHandler) {
        this.userRepository = userRepository;
        this.passwordHashingHandler = passwordHashingHandler;
    }

    async tryMatchUserByEmailAndPassword(email: string, rawPassword: string): Promise<User | null> {

        const userWithPassword = await this.userRepository.createQueryBuilder('u')
            .select(['u.id', 'u.email', 'u.password'])
            .where({email})
            .getOne();

        const isUserExistsAndPasswordMatch = userWithPassword !== undefined
            && await this.passwordHashingHandler.compareRawWithHash({
                hash: userWithPassword.password,
                raw: rawPassword
            });

        if (isUserExistsAndPasswordMatch) {
            return this.getUserById(userWithPassword!.id);
        } else {
            return null;
        }
    }

    async getUserById(id: number): Promise<User> {
        return this.userRepository.findOneOrFail({id});
    }
}
