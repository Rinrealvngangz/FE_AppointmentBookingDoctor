import {Component, OnInit, Input, Output, ViewChild, ChangeDetectorRef} from '@angular/core';
import {IdoctorPopular} from "../home/popular/doctorPopular.model";
import {DoctorPopularService} from "../../services/popular.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, tap} from "rxjs/operators";
import {SpecialitiesService} from "../../services/specialities.service";
import {ISpecialities} from "../home/specialities/specialities.model";
import {ISpeciality} from "../../interface/ISpecialities";
import {global} from "@angular/compiler/src/util";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  limitPage:number=5;
  page:number =1;
  total:number
  name:string = 'firstName'
  limit:string='5'
  specialityField:string=''
  specialityFieldArr:[]=[]
  doctorPopular:IdoctorPopular[]=[]
  specialities:ISpeciality[]=[]
    constructor(private doctor :DoctorPopularService,
              private router:ActivatedRoute,
              private speciality:SpecialitiesService,
              private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.limitPage =parseInt(this.limit)
    this.speciality.getSpecialties().pipe(
      map(data => this.speciality.viewSpecialties(data.specialities))
    ).subscribe(rs => this.specialities =rs );
    this.paginationDoctor(this.page);

  }
  onItemChange(value:any){
    console.log(this.specialityField)
    this.doctor.filterDoctor(this.name,this.specialityField,this.limit).pipe(
      tap(val => this.limitPage = val.doctors.length-1),
      map(data =>this.doctor.viewPopularDoctor(data)),
    ).subscribe(data =>
    {
        this.doctorPopular= [...data]
    })
  }

  getPages(page:number){
      this.page =page;
      this.paginationDoctor(this.page);
  }

  paginationDoctor(p:number){
    let offset = (p -1) * this.limitPage;
    this.doctor.paginationsDoctor(offset,this.limitPage,this.name,this.specialityField).pipe(
      tap(val =>this.total = val.total),
      map(data => this.doctor.viewPopularDoctor(data))
    ).subscribe(data=>{
                 this.doctorPopular =data
    });
  }

}
