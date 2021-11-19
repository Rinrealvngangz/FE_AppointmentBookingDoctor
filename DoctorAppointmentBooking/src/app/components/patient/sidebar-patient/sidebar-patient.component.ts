import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {PatientService} from "../../../services/patient.service";

@Component({
  selector: 'app-sidebar-patient',
  templateUrl: './sidebar-patient.component.html',
  styleUrls: ['./sidebar-patient.component.css']
})
export class SidebarPatientComponent implements OnInit {
  fullName:string =''
  email:string =''
  constructor(private authen:AuthService,private patient:PatientService) { }

  ngOnInit(): void {
  }
  logout(){
    this.authen.logOut();
  }
}
