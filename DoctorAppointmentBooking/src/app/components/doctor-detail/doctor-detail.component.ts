import {Component,OnInit} from '@angular/core';
import {DoctorPopularService} from "../../services/popular.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {IdoctorPopular} from "../home/popular/doctorPopular.model";

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {
   item!:IdoctorPopular
  constructor(private doctor :DoctorPopularService,
              private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.pipe(
      map(param => param.get('id')),
      switchMap(id=>this.doctor.getDoctorById(id)),
      switchMap(data =>this.doctor.viewPopularDoctor(data))
    ).subscribe(rs => this.item = rs)
  }

}
