import {Component, OnInit, ViewChild} from '@angular/core';
import {AppointmentService} from "../../../services/appointment.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, switchMap, toArray} from "rxjs/operators";
import {AppointmentPatientModel} from "../../../interface/IAppointment/AppointmentPatient.model";
import {ModalconfirmDoctorComponent} from "../../admins/doctor-dash/modalconfirm-doctor/modalconfirm-doctor.component";
import {from} from "rxjs";

@Component({
  selector: 'app-appointment-patient',
  templateUrl: './appointment-patient.component.html',
  styleUrls: ['./appointment-patient.component.css']
})
export class AppointmentPatientComponent implements OnInit {
  dataAppointmentPatient:AppointmentPatientModel[]=[];
  @ViewChild('modalRemove')modalRemove!:ModalconfirmDoctorComponent
  idAppointment:any
  constructor(private appointmentService :AppointmentService,
              private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllAppointmentById();
  }
  getAllAppointmentById(){

    this.router.paramMap.pipe(
       map(param => param.get('id')),
       switchMap( id => this.appointmentService.getAppointmentByPatientId(id))
     ).subscribe(data => {
           const tmpData =this.appointmentService.listViewAppointment(data);
       this.dataAppointmentPatient = [...tmpData]
    })
  }

  deleteAppointment(id:any){
    this.idAppointment =id;
    this.modalRemove.openModal();
  }
  removeAppointment($event:any){
           if($event === 'save'){
             this.appointmentService.deleteAppointment(this.idAppointment).subscribe(
               rs => {
                 if(rs.status === 'success'){
                   from(this.dataAppointmentPatient).pipe(
                     filter(item => item.appointmentId != this.idAppointment),
                     toArray()
                   ).subscribe(data => this.dataAppointmentPatient = [...data])
                   this.modalRemove.closeModal();

                 }
               }
             )

           }
  }


}
