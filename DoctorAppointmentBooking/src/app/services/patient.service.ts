import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IMessage} from "../interface/Imessage.model";
import {PatientModel} from "../interface/IPatient/Patient.model";
@Injectable()
export class  PatientService{
  public fullName:string =''
  public email:string =''
        constructor(private  http:HttpClient) {
        }

    register(body:any):Observable<IMessage>{
          return this.http.post<IMessage>(`api/v1/patient`,body);
    }

    getById(id:any):Observable<PatientModel>{
          return this.http.get<PatientModel>(`api/v1/patient/${id}`);
    }

    update(id:any,body:any):Observable<IMessage>{
          return this.http.put<IMessage>(`api/v1/patient/${id}`,body);
    }
    updatePassword(id:any,body:any):Observable<IMessage>{
          return this.http.put<IMessage>(`api/v1/patient/update-password/${id}`,body);
  }
}

