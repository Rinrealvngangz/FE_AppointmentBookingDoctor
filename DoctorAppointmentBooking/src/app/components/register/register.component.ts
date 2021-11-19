import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {dateValidator, phoneValidator} from "../admins/doctor-dash/shared";
import {PatientService} from "../../services/patient.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   mouseover:any
   firstName!: FormControl;
   lastName!:FormControl;
   phone!: FormControl;
   email!: FormControl;
   gender!:FormControl;
   password!:FormControl;
  roleId!:FormControl;
  createPatientForm!:FormGroup
  constructor(private patientService:PatientService,
              private router:Router) { }

  ngOnInit(): void {
    const validatorsName =[Validators.required,
      Validators.pattern('[a-zA-Z].*'),
      Validators.maxLength(10)]
    this.firstName =new FormControl("",validatorsName);
    this.lastName =new FormControl("",[Validators.required,Validators.pattern('[a-zA-Z].*'),
      Validators.maxLength(20)]);
    this.phone =new FormControl("",[Validators.required,
      phoneValidator(/^\d+$/)]);
    this.email =new FormControl("",[Validators.required,Validators.email]);
    this.gender =new FormControl("",Validators.required);
    this.password =new FormControl("",Validators.required);

    this.roleId =new FormControl("2");
    this.createPatientForm =new FormGroup({
        firstName:this.firstName,
        lastName :this.lastName,
        email:this.email,
        phone:this.phone,
        gender:this.gender,
        password: this.password,
        roleId:this.roleId

      },
    )
  }
  validFirstNameCreatePatient(){
    return this.firstName.valid || this.firstName.untouched
  }
  validLastNameCreatePatient(){
    return this.lastName.valid || this.lastName.untouched
  }
  validPhoneCreatePatient(){
    return this.phone.valid || this.phone.untouched
  }
  validGenderCreatePatient(){
    return this.gender.valid || this.gender.untouched
  }
  addPatient(body:any){
    console.log(body)
    this.patientService.register(body).subscribe(rs =>{
      if(rs.status === 'success'){
        this.router.navigate(['/home'])
      }
    });

  }


}
