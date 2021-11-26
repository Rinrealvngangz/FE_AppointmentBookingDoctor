import {Component, OnInit, Input, Output, ViewChild} from '@angular/core';
import {IdoctorPopular} from "../home/popular/doctorPopular.model";
import {DoctorPopularService} from "../../services/popular.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, tap} from "rxjs/operators";
import {SpecialitiesService} from "../../services/specialities.service";
import {ISpecialities} from "../home/specialities/specialities.model";
import {ISpeciality} from "../../interface/ISpecialities";
import {global} from "@angular/compiler/src/util";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  name:string = 'firstName'
  limit:string='10'
  specialityField:string=''
  specialityFieldArr:[]=[]
  doctorPopular:IdoctorPopular[]=[]
  specialities:ISpeciality[]=[]
    constructor(private doctor :DoctorPopularService,
              private router:ActivatedRoute,
              private speciality:SpecialitiesService) { }

  ngOnInit(): void {
    this.doctor.getAllDoctors().pipe(
      map(data => this.doctor.viewPopularDoctor(data))
    ).subscribe(data => this.doctorPopular = data)

    this.speciality.getSpecialties().pipe(
      map(data => this.speciality.viewSpecialties(data.specialities))
    ).subscribe(rs => this.specialities =rs );
  }
  onItemChange(value:any){
    console.log(this.specialityField)
    this.doctor.filterDoctor(this.name,this.specialityField,this.limit).pipe(
      map(data =>this.doctor.viewPopularDoctor(data)),
    ).subscribe(data =>
    {
      this.doctorPopular = [...data]
    })
  }
}
