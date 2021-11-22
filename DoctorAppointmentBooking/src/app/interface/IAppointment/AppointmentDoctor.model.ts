export interface AppointmentDoctorModel{
  appointmentId:string,
  scheduleTimingId:string,
  patientId:string,
  fullName:string,
  phone:string,
  email:string,
  bookDate:Date,
  atBegin:string,
  atEnd:string,
  status:number,
  avatar?:string
}
