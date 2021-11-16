import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ScheduleTimingsService} from "../../../services/schedule-timings.service";
import {AuthService} from "../../../services/auth.service";
import {ScheduleTimingModels} from "../../../interface/IScheduleTimings/ScheduleTimings.model";
import {ScheduleByDateModel} from "../../../interface/IScheduleTimings/ScheduleByDate.model";
import {Observable, Subscription} from "rxjs";
import {ScheduleTimingModel} from "../../../interface/IScheduleTimings/ScheduleTiming.model";

@Component({
  selector: 'app-schedule-timings',
  templateUrl: './schedule-timings.component.html',
  styleUrls: ['./schedule-timings.component.css']
})
export class ScheduleTimingsComponent implements OnInit {
  nameComponent:string='ScheduleTimings'
  namePage:string='ScheduleTimings'
  active:boolean=false
  slotName:string =''
  timings:ScheduleTimingModel[] =[]
  subResult!:ScheduleTimingModels
  arrDayWeek:string[]=[]
  nameDay!:string
  constructor(private  cdr:ChangeDetectorRef,
              private scheduleService:ScheduleTimingsService,
              private authen:AuthService) { }

  ngOnInit(): void {
    this.getById();
  this.arrDayWeek =  this.dates(new Date(Date.now()))
  }

  getById(){
    const id = this.authen.getId();
   this.scheduleService.getById(id)
     .subscribe(val =>{this.subResult = val})
  }

  activeSlot($event:any){
    // $event.style.background ='white'
    // $event.style.color ='back'
    //
    // $event.style.background ='#ff4877'
    // $event.style.color ='white'
    this.slotName =  $event.id
    switch (this.slotName){
      case 'slot_sunday':
        this.timings = this.subResult.scheduleTimings.Sun
        this.nameDay =this.arrDayWeek[6]
        break;
      case 'slot_monday':
        this.timings = this.subResult.scheduleTimings.Monday
        this.nameDay =this.arrDayWeek[0]
        break;
      case 'slot_tuesday':
        this.timings = this.subResult.scheduleTimings.Thuesday
        this.nameDay =this.arrDayWeek[1]
        break;
      case 'slot_wednesday':
        this.timings = this.subResult.scheduleTimings.Wenday
        this.nameDay =this.arrDayWeek[2]
        break;
      case 'slot_thursday':
        this.timings = this.subResult.scheduleTimings.Thursday
        this.nameDay =this.arrDayWeek[3]
        break;
      case 'slot_friday':
        this.timings = this.subResult.scheduleTimings.Friday
        this.nameDay =this.arrDayWeek[4]
        break;
      case 'slot_saturday':
        this.timings = this.subResult.scheduleTimings.Sat
        this.nameDay =this.arrDayWeek[5]
        break;
    }
    this.active =true;
  }
  dates(current:any) {
    var week= []
    // Starting Monday not Sunday
    current.setDate((current.getDate() - current.getDay() +1));
    for (var i = 0; i < 7; i++) {
      const yourDate =  new Date(current);
      week.push(
        yourDate.toISOString().split('T')[0]
      );
      current.setDate(current.getDate() +1);

    }
    return week;
  }


}
