import { User } from '@/modules/user/domain/user';

export interface UserRepositoryPort {
  save(user: User): Promise<User>;
  // findAll(): Promise<User[]>;
}
