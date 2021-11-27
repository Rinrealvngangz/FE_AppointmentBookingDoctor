import { HttpHandler, HttpInterceptor, HttpRequest,HttpEvent,  HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs"
import { catchError} from "rxjs/operators";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { IMessage } from "../interface/Imessage.model";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private toash:ToastrService){}
    intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>> {
                        return next.handle(req).pipe(
                         catchError((err):Observable<any>=>{
                           if(err instanceof HttpErrorResponse){
                             let error ={};
                             console.log(err.status)
                               if(err.status.toString().startsWith('5')){
                                 // @ts-ignore
                                 error.status = 'fail';
                                   // @ts-ignore
                                   error.message = 'Không thể kết nối tới server'
                               }else{
                                 error =err.error;
                               }
                            const message:IMessage ={
                              // @ts-ignore
                               status:error.status,
                              // @ts-ignore
                               message:error.message
                             }
                             this.toash.error(message.message,message.status)
                          return throwError(message.status);
                           }
                           return next.handle(req)
                      })
                       )
    }
}
