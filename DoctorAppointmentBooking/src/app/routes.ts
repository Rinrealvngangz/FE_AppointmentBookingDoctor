import { Routes } from '@angular/router';
import { DoctorFileComponent } from './components/doctor-file/doctor-file.component';
import { HomesComponent } from './components/home/homes-component/homes-component.component';
import { BookingComponent } from './components/booking/booking.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import {LoginComponent} from "./components/login/login.component";
import {MainComponent} from "./components/home/main/main.component";
import {BreadCrumbBarComponent} from "./components/bread-crumb-bar/bread-crumb-bar.component";
import {DoctorDetailComponent} from "./components/doctor-detail/doctor-detail.component";
import {BookingDoctorComponent} from "./components/booking-doctor/booking-doctor.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileSettingsComponent} from "./components/patient/profile-settings/profile-settings.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {DashboardPatientComponent} from "./components/patient/dashboard-patient/dashboard-patient.component";
import {SidebarPatientComponent} from "./components/patient/sidebar-patient/sidebar-patient.component";
import {ChangepasswordComponent} from "./components/patient/changepassword/changepassword.component";
import {CheckoutPatientComponent} from "./components/checkout-patient/checkout-patient.component";

export const appRoutesHome:Routes = [

  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'dashboard',
    //'./admins/admins.modules#AdminsModule',
    loadChildren: () => import('./components/admins/admins.module').then(m => m.AdminsModule)
  },
  {
    path:'', component:MainComponent,
    children:[
      {
        path:'home',component:HomesComponent,
      },
      {
        path:'',component:DashboardPatientComponent,canActivateChild:[AuthGuardService],
        children:[
          {
            path:'patient',component:SidebarPatientComponent,
          },
          {
            path:'patient/profile-setting',component:ProfileSettingsComponent
          },
          {
            path:'patient/profile-setting/password',component:ChangepasswordComponent
          }

        ]
      },
      {
        path:'doctor-profile',component:DoctorDetailComponent
      },

      {
        path:'doctor-profile/:id',component:DoctorDetailComponent
      },
      {
        path:'doctor-profile/:id/booking',component:BookingDoctorComponent
      },
      {
        path:'doctor-profile/:id/booking/checkout',component:CheckoutPatientComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'',redirectTo:'home',pathMatch:'full'
      }
    ]
  }
  // { path: '**', redirectTo: 'home'}

]
