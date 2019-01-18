import {Repository} from 'typeorm';
import User from '../entities/User';

export default class UsersService {

    private readonly userRepository: Repository<User>;

    private readonly currentUser: User;

    constructor(userRepository: Repository<User>, currentUser: User) {
        this.userRepository = userRepository;
        this.currentUser = currentUser;
    }

    async getById(id: number): Promise<User> {
        return this.userRepository.findOneOrFail({id});
    }

    async getCurrentUser() {
        return this.currentUser;
    }
}
