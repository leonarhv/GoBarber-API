import { getRepository, Repository } from 'typeorm';

import iAppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository';
import iCreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentsDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements iAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    date,
  }: iCreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
