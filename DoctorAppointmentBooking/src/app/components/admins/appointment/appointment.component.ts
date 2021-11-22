import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {AppointmentService} from "../../../services/appointment.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {AuthService} from "../../../services/auth.service";
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})


export class AppointmentComponent implements OnInit {
  namePage:string = 'List appointment';
  nameComponent:string ="List appointment";
  rows:any[] =[];
  editing:any = {};
  ColumnMode =ColumnMode;
  tablestyles:any ="bootstrap"
  constructor(private appointmentService :AppointmentService,
              private  router:ActivatedRoute,
              private  auth:AuthService) { }

  ngOnInit(): void {
    this.getAllAppointment();
  }

  updateValue(event:any, cell:any, rowIndex:any) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  getAllAppointment(){
    const id =  this.auth.getId();
    this.appointmentService.getAppointmentByDoctorId(id).subscribe(data=>{
     this.rows = data.appointments;
    })
  }
  saveStatus(id:any){
    console.log(id)
  }
  removeAppointment(id:any){
    console.log(id)
  }

}
