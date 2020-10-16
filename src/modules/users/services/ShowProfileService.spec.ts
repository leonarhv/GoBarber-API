import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('Show Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('Should be able to show profile info', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@test.com',
      password: '12345678',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@test.com');
  });

  it('Should not be able to show a non existing profile info', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non existing ID',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
