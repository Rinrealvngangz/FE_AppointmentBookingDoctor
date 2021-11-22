import {Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
 @Input() authenticated!:boolean;
  id:any;
  constructor(private authen:AuthService) { }
  ngOnInit(): void {
  }

  checkAuth(){
    return this.authen.isExpiredToken() && this.authen.isLogin();
  }
  getIdUser(){
    if(this.checkAuth()){
    this.id =  this.authen.getPatientId();
    return this.id;
    }
  }

}
