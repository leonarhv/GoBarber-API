import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@tests.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create an user with an existing email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@tests.com',
      password: '12345678',
    });

    await expect(
      createUser.execute({
        name: 'Jonathan Doe',
        email: 'johndoe@tests.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
