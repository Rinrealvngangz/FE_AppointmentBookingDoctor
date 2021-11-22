import { Component, OnInit } from '@angular/core';
import {concatMap, filter, map, switchMap, tap, toArray} from "rxjs/operators";
import {AppointmentService} from "../../../services/appointment.service";
import {ActivatedRoute} from "@angular/router";
import {AppointmentPatientModel} from "../../../interface/IAppointment/AppointmentPatient.model";
import {from, Observable, of} from "rxjs";
import {AppointmentPatientModels} from "../../../interface/IAppointment/AppointmentPatientModels.model";

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent implements OnInit {
  dataAppointmentPatient:AppointmentPatientModel[]=[];
  fullname:string='';
  date:string ='';
  begin:string ='';
  end:string ='';
  idUser:any
  constructor(private appointmentService :AppointmentService,
              private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllAppointmentById();
  }

  getAllAppointmentById(){
    this.router.paramMap.pipe(
      map(param => {
            this.idUser = param.get('id');
         return param.get('id')
        }
      ),
      switchMap( (id):Observable<AppointmentPatientModels> => this.appointmentService.getAppointmentByPatientId(id)),
      concatMap((data:AppointmentPatientModels):Observable<AppointmentPatientModel[]> =>{
        const tmpData =this.appointmentService.listViewAppointment(data);
         this.dataAppointmentPatient = [...tmpData];
         return of(this.dataAppointmentPatient)
      })
    ).subscribe(data => {
        this.router.paramMap.pipe(
          map(param => param.get('idAppointment')),
          switchMap(id => from(data).pipe(
            filter(item => item.appointmentId == id),
            toArray()
          ))
        ).subscribe(data=>{
          from(data).pipe(
            map(item =>{
                  this.fullname =item.fullName
                  this.date =item.bookDate.toString()
                  this.begin =item.atBegin
                  this.end =item.atEnd
            })
          ).subscribe()
        })
    })
  }
}
