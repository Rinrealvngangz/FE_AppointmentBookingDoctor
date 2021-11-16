import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent} from "rxjs";
import {map} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {ScheduleTimingsService} from "../../../../services/schedule-timings.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-update-schedule-timings',
  templateUrl: './update-schedule-timings.component.html',
  styleUrls: ['./update-schedule-timings.component.css']
})
export class UpdateScheduleTimingsComponent implements OnInit {
  @Input() begin!:string
  @Input() end!:string
  isOpenModal:boolean=false
  @Input() dayNow:any
  BeginTimings!:FormControl
  EndTimings!:FormControl
  formAdd!:FormGroup
  @Input() ids:any
  @ViewChild('modalchild')modalchild!:ElementRef
  @Output() successAdd = new EventEmitter<any>()
  constructor(private  scheduleService:ScheduleTimingsService,
              private auth:AuthService) { }

  ngOnInit(): void {
    this.BeginTimings =new FormControl(this.begin)
    this.EndTimings =new FormControl(this.end)
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
    console.log(frmAdd)
    console.log(this.ids)
    this.scheduleService.updateScheduleById(this.ids,frmAdd).subscribe(rs=> {
        if (rs.status === 'success'){
          this.successAdd.emit(rs.scheduleTiming);
          this.closeModal();
        }
      }
    );

  }
}
