import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PatientService} from "../../../services/patient.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  oldPass:string='';
  newPass:string ='';
  confirmPass:string ='';
  constructor(private patientService:PatientService,private authen:AuthService) { }

  ngOnInit(): void {
  }
  updatePass(frmUpdatePass:FormGroup){
    const id = this.authen.getPatientId();
    this.patientService.updatePassword(id,frmUpdatePass).subscribe();
  }

}
