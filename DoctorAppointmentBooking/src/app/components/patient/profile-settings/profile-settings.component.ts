import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../services/patient.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
   firstName:string ='';
   lastName:string ='';
   phone:string ='';
   email:string=''
   gender:number = 0
  constructor(private patientService:PatientService,
              private authen:AuthService) { }

  ngOnInit(): void {
  this.getPatientById();
  }
  saveChange(body:any){
    const id = this.authen.getPatientId();
   this.patientService.update(id,body).subscribe()
  }

  getPatientById(){
     const id = this.authen.getPatientId();
     this.patientService.getById(id).subscribe(data=>{
       const patient =data.patient;
       this.firstName =patient.firstName;
       this.lastName =patient.lastName;
       this.phone =patient.phone;
       this.email=patient.email;
       this.gender=patient.gender;
       this.patientService.fullName = data.patient.lastName + data.patient.firstName
       this.patientService.email = data.patient.email
     });
  }



}
