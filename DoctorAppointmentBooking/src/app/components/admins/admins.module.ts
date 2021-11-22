import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { Routes,RouterModule } from '@angular/router';
import { DoctorDashComponent } from './doctor-dash/doctor-dash.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { CreateDoctorComponent } from './doctor-dash/create-doctor/create-doctor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ViewDoctorComponent } from './doctor-dash/view-doctor/view-doctor.component';
import { ModalconfirmDoctorComponent } from './doctor-dash/modalconfirm-doctor/modalconfirm-doctor.component';
import { DoctorListResolver } from './doctor-dash/shared/doctor-list-resolve';
import { SpecialitiesComponent } from './specialities/specialities.component';
import { AddSpecialityComponent } from './specialities/add-speciality/add-speciality.component';
import { UpdateSpecialitiesComponent } from './specialities/update-specialities/update-specialities.component';
import { DeleteSpecialityComponent } from './specialities/delete-speciality/delete-speciality.component';
import { ListAdminComponent } from './admin/list-admin/list-admin.component';
import { ViewAdminComponent } from './admin/view-admin/view-admin.component';
import { PasswordDirective } from 'src/app/directives/validator/passConfirm.directive';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import  {AuthGuardService} from "../../services/auth-guard.service";
import  {AdminGuardService} from "../../services/admin-guard.service";
import  {AuthDashBoardGuardService} from "../../services/authDashBoard-guard.service";
import { ScheduleTimingsComponent } from './schedule-timings/schedule-timings.component';
import { ScheduleSlotComponent } from './schedule-timings/schedule-slot/schedule-slot.component';
import {MyTimePipe} from "../../common/my-time-pipe";
import { AddScheduleTimingsComponent } from './schedule-timings/add-schedule-timings/add-schedule-timings.component';
import { BeginEndTimingsComponent } from './schedule-timings/begin-end-timings/begin-end-timings.component';
import { UpdateScheduleTimingsComponent } from './schedule-timings/update-schedule-timings/update-schedule-timings.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes =[

   {
     path:'dashboard',component:DashboardComponent,
     canActivate:[AuthDashBoardGuardService],
     canActivateChild:[AuthGuardService],
     children:[
      {
        path:'doctor',  canActivateChild:[AuthDashBoardGuardService],
        children:[
          {
            path:'new',component: CreateDoctorComponent,
            data:{
              breadcrumb:"new doctor"
            },
            canDeactivate:[AuthGuardService]
          },
          {
            path:':id',component:ViewDoctorComponent,
            data:{
              breadcrumb:"profile doctor"
            }
          },
          {
            path:'',component:DoctorDashComponent,
            data:{breadcrumb:"list doctor"},
            resolve:{Doctors:DoctorListResolver}
          }

        ],
      },
      {
        path:'specialities',component:SpecialitiesComponent,canActivate:[AdminGuardService],
        data:{
          breadcrumb:"Specialities"
        },
        canActivateChild:[AuthDashBoardGuardService]
      },
       {
         path:'appointment',component:AppointmentComponent,
         data:{
           breadcrumb:"appointment"
         },
         canActivateChild:[AuthDashBoardGuardService]
       },
       {
         path:'scheduleTimings',component:ScheduleTimingsComponent,
         data:{
           breadcrumb:"scheduleTimings"
         },
         canActivateChild:[AuthDashBoardGuardService]
       },
      {
        path:'admins',  canActivateChild:[AuthDashBoardGuardService],//canActivate:[AdminGuardService],
        children:[
          {
            path:'new',component: AddAdminComponent,
            data:{
              breadcrumb:"new admin"
            }
          },
          {
            path:':id',component:ViewAdminComponent,
            data:{
              breadcrumb:"Profile admin"
            }
          },
          {
            path:'',component:ListAdminComponent,
            data:{
              breadcrumb:"List admins"
            }
          }

        ]
      },
      {
        path:'',redirectTo:'dashboard',pathMatch:'full'
      }
     ]
   }

]
@NgModule({
  declarations: [
    AdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    DoctorDashComponent,
    CreateDoctorComponent,
    DashboardComponent,
    ViewDoctorComponent,
    ModalconfirmDoctorComponent,
    SpecialitiesComponent,
    AddSpecialityComponent,
    UpdateSpecialitiesComponent,
    DeleteSpecialityComponent,
    ListAdminComponent,
    ViewAdminComponent,
    PasswordDirective,
    AddAdminComponent,
    ScheduleTimingsComponent,
    ScheduleSlotComponent,
    MyTimePipe,
    AddScheduleTimingsComponent,
    BeginEndTimingsComponent,
    UpdateScheduleTimingsComponent,
    AppointmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MyTimePipe,
    AdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    DoctorDashComponent,
    CreateDoctorComponent,
    DashboardComponent,
    ViewDoctorComponent,
    ModalconfirmDoctorComponent,
    AddSpecialityComponent,
    UpdateSpecialitiesComponent,
    ListAdminComponent,
    ViewAdminComponent,
    PasswordDirective,
    AddAdminComponent,
    ScheduleTimingsComponent,
    UpdateScheduleTimingsComponent,
    AppointmentComponent
  ],
})
export class AdminsModule { }
