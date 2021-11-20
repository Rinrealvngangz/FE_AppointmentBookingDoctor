import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,} from '@angular/core';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { MyPipeDate } from './common/my-pipe';
import { RouterModule } from '@angular/router';
import { appRoutesHome } from './routes';
import { LightboxModule } from 'ngx-lightbox';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { DoctorListResolver } from './components/admins/doctor-dash/shared/doctor-list-resolve';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptor } from './interceptors/loader-interceptor';
import { ToastrModule } from 'ngx-toastr';
import  {JwtModule} from "@auth0/angular-jwt";
import {AuthService} from "./services/auth.service";
import {PatientService} from "./services/patient.service";
// directive customer
import { EventHoverDirective } from './directives/event.directive';

//importService , component home
import {
  HeaderComponent,
  BannerComponent,
  SpecialitiesComponent,
  PopularComponent,
  DoctorWidgetComponent,
  AvailabeFeaturesComponent,
  FooterComponent,
  DoctorPopularService
} from './components/home/index';
import { DoctorFileComponent } from './components/doctor-file/doctor-file.component';
import { HomesComponent } from './components/home/homes-component/homes-component.component';
import { BookingComponent } from './components/booking/booking.component';
import { BreadCrumbBarComponent } from './components/bread-crumb-bar/bread-crumb-bar.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { AdminsModule } from './components/admins/admins.module';
import { BreadCrumbsService } from './services/breadCrumb.service';
import { SpecialitiesService } from './services/specialities.service';
import { ErrorInterceptor } from './interceptors/Error-interceptor';
import { AdminService } from './services/admins.service';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import  {AuthGuardService} from "./services/auth-guard.service";
import {AdminGuardService} from "./services/admin-guard.service";
import  {AuthDashBoardGuardService} from "./services/authDashBoard-guard.service";
import { MainComponent } from './components/home/main/main.component';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';
import { BookingDoctorComponent } from './components/booking-doctor/booking-doctor.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileSettingsComponent } from './components/patient/profile-settings/profile-settings.component';
import { DashboardPatientComponent } from './components/patient/dashboard-patient/dashboard-patient.component';
import { SidebarPatientComponent } from './components/patient/sidebar-patient/sidebar-patient.component';
import { ChangepasswordComponent } from './components/patient/changepassword/changepassword.component';
import {HightlightColorDirective} from "./directives/hightlightColor.directive";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    SpecialitiesComponent,
    PopularComponent,
    DoctorWidgetComponent,
    MyPipeDate,
    AvailabeFeaturesComponent,
    FooterComponent,
    DoctorFileComponent,
    HomesComponent,
    BookingComponent,
    BreadCrumbBarComponent,
    DoctorComponent,
    EventHoverDirective,
    HightlightColorDirective,
    LoginComponent,
    MainComponent,
    DoctorDetailComponent,
    BookingDoctorComponent,
    RegisterComponent,
    ProfileSettingsComponent,
    DashboardPatientComponent,
    SidebarPatientComponent,
    ChangepasswordComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CarouselModule,
        LightboxModule,
        RouterModule.forRoot(appRoutesHome),
        HttpClientModule,
        AdminsModule,
        NgxSpinnerModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            progressBar: true
        }),
        // JwtModule.forRoot({
        //   config: {
        //     allowedDomains: ["localhost:3000"]
        //   }
        // }),
        FormsModule,
        ReactiveFormsModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    SpecialitiesService,
    DoctorPopularService,
    DoctorListResolver,
    AdminService,
    AuthService,
    AuthGuardService,
    AdminGuardService,
    AuthDashBoardGuardService,
    BreadCrumbsService,
    PatientService,
    {
      provide: APP_BASE_HREF,
      useValue:'/'
    },
    {provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}
  ],
  bootstrap: [
    AppComponent
  ],


})
export class AppModule { }
