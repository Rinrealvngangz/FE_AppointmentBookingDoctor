import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DoctorPopularService} from "../../services/popular.service";
import {concatMap, map, switchMap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {ScheduleByDateModel} from "../../interface/IScheduleTimings/ScheduleByDate.model";
import {ScheduleTimingModel} from "../../interface/IScheduleTimings/ScheduleTiming.model";
import {PatientService} from "../../services/patient.service";
import {AppointmentService} from "../../services/appointment.service";

@Component({
  selector: 'app-checkout-patient',
  templateUrl: './checkout-patient.component.html',
  styleUrls: ['./checkout-patient.component.css']
})
export class CheckoutPatientComponent implements OnInit {
  firstName:string ='';
  lastName:string ='';
  email:string ='';
  phone:string ='';
  name:string ='';
  src:string ='';
 date:string ='';
 beginTime:string ='';
 endTime:string ='';
 checkLogin:boolean =false;
  scheduleId:any
  patientId:any
  constructor(private authService :AuthService,
              private doctorService :DoctorPopularService,
              private router:ActivatedRoute,
              private patient :PatientService,
              private appointmentSerice:AppointmentService,
              private routerNav:Router) { }

  ngOnInit(): void {
    this.callDoctorDetail();
    this.getLocalStorage();
    this.getInfoCustomer();
  }
  callDoctorDetail(){
    this.router.paramMap.pipe(
      map(param=> param.get('id')),
      switchMap(id =>this.doctorService.getDoctorById(id)),
      concatMap(doctor => this.doctorService.viewPopularDoctor(doctor))
    ).subscribe(result => {
      this.name =result.name
      this.src =result.src
    })
  }

  getLocalStorage(){
    const data =  localStorage.getItem("schedule");
    if(data) {
     const schedule:ScheduleTimingModel = JSON.parse(data);
       this.date =schedule.bookDate.toString();
       this.endTime =schedule.atEnd;
       this.beginTime =schedule.atBegin;
       this.scheduleId =schedule.scheduleTimingId;
    }
  }
  checkout(data:any) {
  const body = {
    scheduleId:data.scheduleId,
    patientId:data.patientId
  }
    this.appointmentSerice.addAppointment(body).subscribe(
      rs =>{
        if(rs.status === 'success'){
             localStorage.removeItem("schedule")
          this.routerNav.navigate(['user',this.patientId,'bookingSuccess',rs.idAppointment])
        }
      }
    )
  }

  getInfoCustomer(){
    const isLogin = this.authService.isExpiredToken();
    if(isLogin){
      this.checkLogin =true;
      const id = this.authService.getPatientId();
       this.patient.getById(id).subscribe(
         data => {
           this.firstName =data.patient.firstName;
           this.lastName =data.patient.lastName;
           this.email =data.patient.email;
           this.phone =data.patient.phone;
           this.patientId =data.patient.patientId;
         }
       )
    }
  }

}
