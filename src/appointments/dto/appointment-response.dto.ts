export class AppointmentResponseDto {
  id: number;
  appointment_date: Date;
  duration: number;
  status: string;
  clientId: number;
  businessId: number;
}

export class AppointmentClientDto {
  id: number;
  appointment_date: Date;
  duration: number;
  status: string;
  clientId: number;
  business: {
    id: number;
    name: string;
    email: string;
    profession?: string;
  };
}

export class AppointmentBusinessDto {
  id: number;
  appointment_date: Date;
  duration: number;
  status: string;
  businessId: number;
  client: {
    id: number;
    name: string;
    email: string;
  };
}
