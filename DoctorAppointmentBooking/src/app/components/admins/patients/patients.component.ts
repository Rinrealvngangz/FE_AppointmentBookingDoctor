import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {AuthService} from "../../../services/auth.service";
import {AppointmentService} from "../../../services/appointment.service";
import {from} from "rxjs";
import {filter, toArray} from "rxjs/operators";
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  namePage:string = 'List patient';
  nameComponent:string ="List patient";
  rows:any[] =[];
  editing:any = {};
  ColumnMode =ColumnMode;
  tablestyles:any ="bootstrap"
  constructor(private auth:AuthService,
              private appointmentService:AppointmentService) { }

  ngOnInit(): void {
    this.getAllAppointment()
  }

  getAllAppointment(){
    const id =  this.auth.getId();
    this.appointmentService.getAppointmentByDoctorId(id).subscribe(data=>{
      from(data.appointments).pipe(
         filter(item => item.status !==0),
         toArray()
      ).subscribe(data =>this.rows =[...data])
    })
  }

  updateValue(event:any, cell:any, rowIndex:any) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
}
