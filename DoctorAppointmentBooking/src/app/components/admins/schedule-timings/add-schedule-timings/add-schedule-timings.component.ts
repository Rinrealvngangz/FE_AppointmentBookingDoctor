import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent} from "rxjs";
import {map} from "rxjs/operators";
import {IMessage} from "../../../../interface/Imessage.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ScheduleTimingsService} from "../../../../services/schedule-timings.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-add-schedule-timings',
  templateUrl: './add-schedule-timings.component.html',
  styleUrls: ['./add-schedule-timings.component.css']
})
export class AddScheduleTimingsComponent implements OnInit ,AfterViewInit{
  isOpenModal:boolean=false
  @Input() dayNow:any
  constructor(private  scheduleService:ScheduleTimingsService,
              private auth:AuthService) { }
  BeginTimings!:FormControl
  EndTimings!:FormControl
  formAdd!:FormGroup
  @ViewChild('modalchild')modalchild!:ElementRef
  @Output() successAdd = new EventEmitter<any>()
  ngOnInit(): void {
    this.BeginTimings =new FormControl('test')
    this.EndTimings =new FormControl('test')
    this.formAdd =new FormGroup({
      startBegin:this.BeginTimings,
      endTime:this.EndTimings
   })
  }

  openModal(){
    this.isOpenModal =true;
  }

  ngAfterViewInit(){
    fromEvent(this.modalchild.nativeElement,'click').pipe(
      map( (el:any) => el.target.className)
    )
      .subscribe(el => el === 'modal fade custom-modal show' ? this.isOpenModal = false : this.isOpenModal)
  }

  closeModal(){
    this.isOpenModal =false;
  }

  addSchedule(frmAdd:any){

    frmAdd.dayAdd = this.dayNow
    const id = this.auth.getId();
    this.scheduleService.addTimings(id,frmAdd).subscribe(rs=> {
      if (rs.status === 'success'){
        console.log(rs.scheduleTiming)
        this.successAdd.emit(rs.scheduleTiming);
        this.closeModal();
      }
    }
    );

  }

}
