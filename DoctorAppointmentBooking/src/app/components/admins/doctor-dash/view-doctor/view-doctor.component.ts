import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DoctorPopularService } from 'src/app/services/popular.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import {fromEvent, Observable, of} from 'rxjs';
import {ICreateDoctor, IDoctorProfile} from 'src/app/interface/Idoctor/index';
import {dateValidator,phoneValidator} from "../shared/index";
import { IMessage } from 'src/app/interface/Imessage.model';
import { Router } from '@angular/router';
import { ModalconfirmDoctorComponent } from '../modalconfirm-doctor/modalconfirm-doctor.component';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit ,AfterViewInit{
oldPass:string='';
newPass:string ='';
confirmPass:string ='';
namePage:string='Profile';
nameComponent:string='Profile';
firstName!:FormControl;
lastName!:FormControl;
 phone!: FormControl;
 DOB!: FormControl;
 address!: FormControl;
 gender!:FormControl;
 spec!:FormControl;
 specialityId!:FormControl
 roleId!:FormControl;
 viewForm!:FormGroup;
 localtion:string ="Viet Nam,Dalat"
 avatar:string =''
 isActiveAbout:boolean =true;
 isActiveEdit:boolean =false;
 idDoctor!:any;
 testmess:string =""
  @ViewChild('modalchild')modalchild!:ElementRef
  @ViewChild('modalRemove')modalRemove!:ModalconfirmDoctorComponent
  constructor(private doctorService:DoctorPopularService,
             private route:ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    const validatorsName =[Validators.required,
      Validators.pattern('[a-zA-Z].*'),
      Validators.maxLength(10)]

    const doctor=  this.route.paramMap.pipe(
      map(param => param.get('id')),
      switchMap(id => this.doctorService.getDoctorById(id))
    );

    doctor.subscribe(doc =>{
      this.doctorService.viewDoctorProfile(doc)?.subscribe(
        item => {
          this.idDoctor =item.doctorId;
          this.avatar =item.avatar;
          this.firstName =new FormControl(item.firstName,validatorsName);
          this.lastName =new FormControl(item.lastName,[Validators.required,Validators.pattern('[a-zA-Z].*'),
            Validators.maxLength(20)]);
          this.address =new FormControl(item.address,Validators.required);
          this.phone =new FormControl(item.phone,[Validators.required,
            phoneValidator(/^\d+$/)]);
          this.DOB =new FormControl(item.DOB,[Validators.required,dateValidator()]);
          this.gender =new FormControl("",Validators.required)
          this.specialityId = new FormControl(2);
          this.roleId = new FormControl(2);
          this.viewForm =new FormGroup({
            fistName:this.firstName,
            lastName:this.lastName,
            phone :this.phone,
            dob :this.DOB,
            gender:this.gender,
            address:this.address,
            specialityId:this.specialityId,
            roleId:this.roleId,
          })
        }
      );
    })
  }

  ngAfterViewInit(){
    fromEvent(this.modalchild.nativeElement,'click').pipe(
       map( (el:any) => el.target.className)
    )
    .subscribe(el => el === 'modal fade show' ? this.isActiveEdit = false : this.isActiveEdit)

  }
  validFirstNameCreateDoctor(){
    return this.firstName.valid || this.firstName.untouched
  }
  validLastNameCreateDoctor(){
    return this.lastName.valid || this.lastName.untouched
  }
  validPhoneCreateDoctor(){
    return this.phone.valid || this.phone.untouched
  }
  validAdressCreateDoctor(){
    return this.address.valid || this.address.untouched
  }
  validGenderCreateDoctor(){
    return this.gender.valid || this.gender.untouched
  }
  validDoBCreateDoctor(){
    return this.DOB.valid || this.DOB.untouched
  }


  activeTab(){
       this.isActiveAbout = true
  }
  activeTabPass(){
    this.isActiveAbout =false
  }

  editDoctor(){
    this.isActiveEdit =true;
  }

  displayShow(){
        if(this.isActiveEdit)
        return "block";
        else
          return "none"
  }

  offModal(){
    this.isActiveEdit =false;
  }

  saveChange(formChange:ICreateDoctor){
     this.doctorService.updateDoctorById(this.idDoctor,formChange)
     .subscribe((mes:IMessage) => {
       if( mes.status === 'success'){
          this.router.navigate(['/dashboard/doctor/',this.idDoctor]);
          this.isActiveEdit = !this.isActiveEdit;
       }
      })
  }

  removeDoctor(event:string){

     if(event === "save"){
      this.doctorService.removeDoctor(this.idDoctor)
      .subscribe((mes:IMessage) => {
       if( mes.status === 'success'){
          this.router.navigateByUrl('/dashboard/doctor');
          this.isActiveEdit = !this.isActiveEdit;
       }
      });
     }
  }

  callModalRemove(){
    this.modalRemove.openModal();
  }

  updatePass(frmUpdatePass:FormGroup){
    console.log(frmUpdatePass)
    this.doctorService.updatePass(this.idDoctor,frmUpdatePass).subscribe();
  }

}
