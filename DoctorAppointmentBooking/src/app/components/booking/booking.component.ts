import { Component, OnInit } from '@angular/core';
import {WeekModel} from "../../interface/Week.model";
import {ScheduleTimingsService} from "../../services/schedule-timings.service";
import {ActivatedRoute} from "@angular/router";
import {concatMap, map, switchMap} from "rxjs/operators";
import {ScheduleByDateModel} from "../../interface/IScheduleTimings/ScheduleByDate.model";
import {DoctorPopularService} from "../../services/popular.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styles:[
    'li.nav-item.active { background: green; }',
    'a.disabled {pointer-events: none; cursor: default}'

  ]
})
export class BookingComponent implements OnInit {
  week:WeekModel [] =[];
  name:string =''
  speciality:string = ''
  src:string =''
  id:any
  checkBooking:boolean= false;
  scheduleTimeModel:ScheduleByDateModel
  constructor(private scheduleService:ScheduleTimingsService,
              private router:ActivatedRoute,
              private doctorService:DoctorPopularService) { }

  ngOnInit(): void {
    this.dates(new Date(Date.now()))
    this.getScheduleWeekById();
    this.getDoctorById();
  }
  dates(current:any) {
    // Starting Monday not Sunday
    current.setDate((current.getDate() - current.getDay() +1));
    for (var i = 0; i < 7; i++) {
      const yourDate =  new Date(current);
      const itemWeek:WeekModel =
        {
          date:yourDate.toDateString().split(' ')[0],
          month:yourDate.toDateString().split(' ')[1],
          day:yourDate.toDateString().split(' ')[2],
          year:yourDate.toDateString().split(' ')[3]
        }
      this.week.push(
        itemWeek
      );
      current.setDate(current.getDate() +1);

    }
    return this.week;
  }
  getScheduleWeekById(){
   this.router.paramMap.pipe(
     map(param=> param.get('id')),
     switchMap(id =>this.scheduleService.getScheduleWeekById(id))
   ).subscribe(result => this.scheduleTimeModel =result.scheduleTimings)
  }
  getDoctorById(){
    this.router.paramMap.pipe(
      map(param=> param.get('id')),
      switchMap(id =>this.doctorService.getDoctorById(id)),
      concatMap(doctor => this.doctorService.viewPopularDoctor(doctor))
    ).subscribe(result => {
      this.name =result.name
      this.speciality =result.specialitiesName
      this.src =result.src
      this.id =result.id
    })
  }

  checkScheduleStorage(){
  const schedule =  localStorage.getItem("schedule")
    return schedule ? this.checkBooking =true : this.checkBooking =false
  }
}
