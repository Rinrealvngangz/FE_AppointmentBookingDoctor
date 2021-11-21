import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, Observable, Subscription} from "rxjs";
import {ScheduleTimingModels} from "../interface/IScheduleTimings/ScheduleTimings.model";
import {ScheduleTimingDoctorModel} from "../interface/IScheduleTimings/ScheduleTimingDoctor.model";
import {map} from "rxjs/operators";
import {ScheduleTimingModel} from "../interface/IScheduleTimings/ScheduleTiming.model";
import {IMessage} from "../interface/Imessage.model";


@Injectable({
  providedIn: 'root'
})

export class ScheduleTimingsService {
  count:number =0;
  countNoClick:number =0;
   scheduleTimingDoctor!:ScheduleTimingDoctorModel;
  result:Subscription =new Subscription();
  constructor(private  http:HttpClient) {
  }

  getById(id:any):Observable<ScheduleTimingModels>{
    return this.http.get<ScheduleTimingModels>(`api/v1/schedule/${id}`)
  }

  addTimings(id:any,body:any):Observable<IMessage>{
            return this.http.post<IMessage>(`api/v1/schedule/${id}`,body)
  }

  getScheduleById(id:any,idSchedule:any):Observable<any>{
    return this.http.get<any>(`api/v1/schedule/${id}/get/${idSchedule}`)
  }
  getScheduleWeekById(id:any):Observable<ScheduleTimingModels>{
    return this.http.get<ScheduleTimingModels>(`api/v1/scheduleWeek/${id}`)
  }


  updateScheduleById(id:any,body:any):Observable<IMessage>{
    return this.http.put<IMessage>(`api/v1/schedule/${id}`,body)
  }

  deleteScheduleById(id:any):Observable<IMessage>{
    return this.http.delete<IMessage>(`api/v1/schedule/${id}`);
  }

}
