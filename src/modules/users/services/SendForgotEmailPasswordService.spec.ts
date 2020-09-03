import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotEmailPasswordService from './SendForgotEmailPasswordService';

describe('SendForgotPasswordEmail', () => {
  it('Should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const SendForgotPasswordEmail = new SendForgotEmailPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      email: 'jordan@example.com.br',
      name: 'Jordan',
      password: '123456',
    });

    await SendForgotPasswordEmail.execute({
      email: 'jordan@example.com.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
