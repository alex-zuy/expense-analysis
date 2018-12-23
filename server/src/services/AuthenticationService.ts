import {Repository} from 'typeorm';
import User from '../entities/User';
import {PasswordHashFunction} from '../passwordHash';

export default class AuthenticationService {

    private readonly userRepository: Repository<User>;

    private readonly passwordHashFunction: PasswordHashFunction;

    constructor(userRepository: Repository<User>, passwordHashFunction: PasswordHashFunction) {
        this.userRepository = userRepository;
        this.passwordHashFunction = passwordHashFunction;
    }

    async tryMatchUserByEmailAndPassword(email: string, rawPassword: string): Promise<User | null> {

        const userWithPassword = await this.userRepository.createQueryBuilder('u')
            .select(['u.id', 'u.email', 'u.password'])
            .where({email})
            .getOne();

        const rawPasswordHash = await this.passwordHashFunction(rawPassword);

        if(userWithPassword !== undefined && userWithPassword.password === rawPasswordHash) {
            return this.getUserById(userWithPassword.id);
        } else {
            return null;
        }
    }

    async getUserById(id: number): Promise<User> {
        return this.userRepository.findOneOrFail({id});
    }
}
