import {
  ElementRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import {ScheduleTimingModel} from "../../../../interface/IScheduleTimings/ScheduleTiming.model";
import {IMessage} from "../../../../interface/Imessage.model";
import {AddSpecialityComponent} from "../../specialities/add-speciality/add-speciality.component";
import {AddScheduleTimingsComponent} from "../add-schedule-timings/add-schedule-timings.component";
import {UpdateScheduleTimingsComponent} from "../update-schedule-timings/update-schedule-timings.component";
import {ScheduleTimingsService} from "../../../../services/schedule-timings.service";
import {from, of} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-schedule-slot',
  templateUrl: './schedule-slot.component.html',
  styleUrls: ['./schedule-slot.component.css']
})
export class ScheduleSlotComponent implements OnInit,AfterViewInit ,OnChanges,OnDestroy{
  begin!:string
  end!:string
  idSchedules:any
  @Input() active:boolean =false
  @Input() timings:ScheduleTimingModel[]=[]
  @Input() id:any
  @Input() nameDay:any
  @ViewChild('slotRef')slotRef!:ElementRef
  @ViewChild('modalAdd')modalAdd!:AddScheduleTimingsComponent
  @ViewChild('modalEdit')modalEdit!:UpdateScheduleTimingsComponent
  idSlot:any;
  constructor(private scheduleService:ScheduleTimingsService) { }

  ngOnInit(): void {
    console.log(this.timings)
  }
  ngAfterViewInit() {
    this.idSlot =  this.slotRef.nativeElement.id
  }
  checkActive() {
    return  this.active
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.timings)
  }
  ngOnDestroy() {
    this.active =false;
  }


  eventFromModal($event:any){
     this.timings.push($event);
     this.timings = [...this.timings]
  }
  openModal(){
     this.modalAdd.openModal();
  }

  EditTimings(id:any,idSchedule:any)
  {
    this.idSchedules =idSchedule
    console.log(id);
    console.log(idSchedule);
  this.scheduleService.getScheduleById(id,idSchedule).subscribe(
    val=>{
       this.begin = val.atBegin;
       this.end = val.atEnd;
    })
    this.modalEdit.openModal();

  }
  eventFromModalEdit($event:any){
    console.log($event)
    from(this.timings).pipe(
     filter(val => val.scheduleTimingId === $event.scheduleTimingId),
      map(data => {
        return {
            ...data,
          atBegin:$event.atBegin,
          atEnd:$event.atEnd
        }
      } )
    ).subscribe(rs => this.timings[0] = rs)
  }

}
