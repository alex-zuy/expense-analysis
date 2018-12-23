import {Repository} from 'typeorm';
import User from '../entities/User';

export default class UsersService {

    private userRepository: Repository<User>;

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async getById(id: number): Promise<User> {
        return this.userRepository.findOneOrFail({id});
    }
}
