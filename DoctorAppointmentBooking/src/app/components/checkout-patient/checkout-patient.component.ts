import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DoctorPopularService} from "../../services/popular.service";
import {concatMap, map, switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {ScheduleByDateModel} from "../../interface/IScheduleTimings/ScheduleByDate.model";
import {ScheduleTimingModel} from "../../interface/IScheduleTimings/ScheduleTiming.model";
import {PatientService} from "../../services/patient.service";

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
  constructor(private authService :AuthService,
              private doctorService :DoctorPopularService,
              private router:ActivatedRoute,
              private patient :PatientService) { }

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
    }
  }
  checkout(data:any){
    console.log(data)
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
         }
       )
    }
  }

}
