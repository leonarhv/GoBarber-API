import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import iAppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository';
import iCreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentsDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements iAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: iCreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }
}

export default AppointmentsRepository;
