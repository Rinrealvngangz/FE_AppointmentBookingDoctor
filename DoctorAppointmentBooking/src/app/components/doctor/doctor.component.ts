import {Component, OnInit, Input, Output, ViewChild, ChangeDetectorRef} from '@angular/core';
import {IdoctorPopular} from "../home/popular/doctorPopular.model";
import {DoctorPopularService} from "../../services/popular.service";
import {ActivatedRoute} from "@angular/router";
import {concatMap, debounceTime, map, startWith, switchMap, tap, toArray} from "rxjs/operators";
import {SpecialitiesService} from "../../services/specialities.service";
import {ISpecialities} from "../home/specialities/specialities.model";
import {ISpeciality} from "../../interface/ISpecialities";
import {global} from "@angular/compiler/src/util";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  formquery!: FormGroup
  queryControl:FormControl
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
     this.queryControl =new FormControl("")
      this.formquery = new FormGroup({
        queryDoctor:this.queryControl
      })
    this.limitPage =parseInt(this.limit)
    this.speciality.getSpecialties().pipe(
      map(data => this.speciality.viewSpecialties(data.specialities))
    ).subscribe(rs => this.specialities =rs );
    this.paginationDoctor(this.page);

     // @ts-ignore
    this.formquery.get("queryDoctor").valueChanges.pipe(
       debounceTime(500),
       switchMap(query => this.doctor.searchDoctor(query,this.name,this.specialityField,this.limit).pipe(
         tap(val => this.limitPage = val.doctors.length-1),
         map(data => this.doctor.viewPopularDoctor(data))
       ))
     ).subscribe(data => this.doctorPopular = [...data])
  }

  onItemChange(value:any){
    let search = this.formquery.get("queryDoctor")?.value;
    this.doctor.searchDoctor(search,this.name,this.specialityField,this.limit).pipe(
      tap(val => console.log(val)),
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
    let search = this.formquery.get("queryDoctor")?.value;
    let offset = (p -1) * this.limitPage;
    this.doctor.paginationsDoctor(search,offset,this.limitPage,this.name,this.specialityField).pipe(
      tap(val =>this.total = val.total),
      map(data => this.doctor.viewPopularDoctor(data))
    ).subscribe(data=>{
                 this.doctorPopular =data
    });
  }

}
