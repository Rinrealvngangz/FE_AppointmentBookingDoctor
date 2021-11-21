import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subject, Subscription} from "rxjs";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  nameOrEmail:string=''
  password:string =''
  type:string =''
  data:Subscription =new Subscription()
  constructor(private authenService:AuthService,private router:Router) { }

  ngOnInit(): void {

  }
    // @ts-ignore
  login(frmLogin:any){
        const isDoctorlogin = frmLogin.nameOrEmail;
    console.log(isDoctorlogin)
        if(isDoctorlogin){
          const data={
            nameOrEmail:frmLogin.nameOrEmail,
             password:frmLogin.password
          }
          let pathRouter = data.nameOrEmail.includes('@') ? 'doctor' : 'admin';
          if(frmLogin.type !== 'doctor') pathRouter = 'patient';
           this.authenService.login(data,pathRouter).subscribe(data =>{
             if(data.status === 'success'){
               if(this.authenService.url === ''){
                 this.authenService.url ='/home';
               }
               this.data =  this.authenService.getInfoStoreToken(data.token).subscribe(()=>{
                 this.router.navigate([this.authenService.url])
                   this.authenService.url ='';
               }
               );
             }
          })
        }
  }
  ngOnDestroy() {
     this.data.unsubscribe()
  }
}
