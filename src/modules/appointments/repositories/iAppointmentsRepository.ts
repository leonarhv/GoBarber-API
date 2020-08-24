import Appointment from '../infra/typeorm/entities/Appointment';
import iCreateAppointmentsDTO from '../dtos/iCreateAppointmentsDTO';

export default interface iAppointmentsRepository {
  create(data: iCreateAppointmentsDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
