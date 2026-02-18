import { CreateUserProps } from '@/modules/user/domain/user.types';

export class User {
  private constructor(
    private readonly _id: string,
    private _email: string,
    private _password: string,
  ) {}

  static create(props: CreateUserProps) {
    const { id, email, password } = props;

    return new User(id, email, password);
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }
}
