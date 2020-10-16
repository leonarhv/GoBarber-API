import AppError from '@shared/errors/AppErrors';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateProfileService;

describe('Update avatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to update profile info', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345678',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Senna',
      email: 'John_senna@test.com',
    });

    expect(updatedUser.name).toBe('John Senna');
    expect(updatedUser.email).toBe('John_senna@test.com');
  });

  it('Should not be able to update a non existing profile info', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non existing ID',
        name: 'John Senna',
        email: 'John_senna@test.com',
        password: '87654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345678',
    });

    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'teste@test.com',
      password: '12345678',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Robson',
        email: 'john@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345678',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Senna',
      email: 'John_senna@test.com',
      old_password: '12345678',
      password: '87654321',
    });

    expect(updatedUser.password).toBe('87654321');
  });

  it('Should not be able to update the password whithout old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345678',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Senna',
        email: 'John_senna@test.com',
        password: '87654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password whith wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345678',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Senna',
        email: 'John_senna@test.com',
        old_password: 'Wrong password',
        password: '87654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
