// import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../repositories/iUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

// import User from '../infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotEmailPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(email, 'Pedido de recuperação recebido');
  }
}

export default SendForgotEmailPasswordService;
