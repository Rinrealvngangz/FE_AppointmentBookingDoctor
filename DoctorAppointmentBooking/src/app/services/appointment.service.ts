import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {from, Observable} from "rxjs";
import {IMessage} from "../interface/Imessage.model";
import {AppointmentPatientModel} from "../interface/IAppointment/AppointmentPatient.model";
import {AppointmentPatientModels} from "../interface/IAppointment/AppointmentPatientModels.model";
import {map} from "rxjs/operators";
import {AppointmentDoctorsModel} from "../interface/IAppointment/AppointmentDoctors.model";

const PATH = "assets/img/doctors/";

@Injectable()
export class AppointmentService{
    constructor(private http:HttpClient) {
    }
    addAppointment(body:any):Observable<IMessage>{
      return this.http.post<IMessage>('api/v1/appointment',body);
    }
    getAppointmentByPatientId(id:any):Observable<AppointmentPatientModels>{
    return this.http.get<AppointmentPatientModels>(`api/v1/appointments-patient/${id}`);
    }

    getAppointmentByDoctorId(id:any):Observable<AppointmentDoctorsModel>{
      return this.http.get<AppointmentDoctorsModel>(`api/v1/appointments-doctor/${id}`);
    }

    listViewAppointment(data:AppointmentPatientModels){
     let dataAppointmentPatient:AppointmentPatientModel[]=[]
      let i =0;
       from(data.appointments).pipe(
         map(item =>{
           i == 5 ? i=1 : i++
              return {
                 ...item,
                src:`${PATH}doctor-0${i}.jpg`,
              }
         })
       ).subscribe(item =>{

           dataAppointmentPatient.push(item)
         dataAppointmentPatient = [...dataAppointmentPatient]
       })
      return dataAppointmentPatient;
    }



    deleteAppointment(id:any):Observable<IMessage>{
       return this.http.delete<IMessage>(`api/v1/appointment/${id}`)
    }


}
