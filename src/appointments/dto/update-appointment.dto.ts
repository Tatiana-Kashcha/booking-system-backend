export class UpdateAppointmentDto {
  id: number;
  date: Date;
  duration: number;
  status: string;
  client_id: number;
  business_id: number;
}
