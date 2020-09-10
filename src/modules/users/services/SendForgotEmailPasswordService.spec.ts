import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotEmailPasswordService from './SendForgotEmailPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotEmailPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotEmailPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      email: 'jordan@example.com.br',
      name: 'Jordan',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'jordan@example.com.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'jordan@example.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('sould generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      email: 'jordan@example.com.br',
      name: 'Jordan',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'jordan@example.com.br',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
