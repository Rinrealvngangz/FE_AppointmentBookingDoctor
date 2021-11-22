export interface AppointmentPatientModel{
  appointmentId:string,
  doctorId:string,
  fullName:string,
  phone:string,
  email:string,
  bookDate:Date,
  atBegin:string,
  atEnd:string,
  status:number,
  src?:string

}
