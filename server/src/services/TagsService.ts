import {Repository} from 'typeorm';
import Tag from '../entities/Tag';
import User from '../entities/User';

export interface TagsCriteria { }

export default class TagsService {

    constructor(
        private readonly currentUser: User,
        private readonly tagsRepository: Repository<Tag>
    ) {}

    async listTags(criteria: TagsCriteria = {}): Promise<Tag[]> {
        return this.tagsRepository.find({
            where: {
                user: this.currentUser
            }
        });
    }
}
