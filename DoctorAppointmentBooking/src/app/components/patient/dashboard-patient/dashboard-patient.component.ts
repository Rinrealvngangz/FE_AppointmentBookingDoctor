import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-dashboard-patient',
  templateUrl: './dashboard-patient.component.html',
  styleUrls: ['./dashboard-patient.component.css']
})
export class DashboardPatientComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
