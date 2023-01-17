import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotTableModule } from '@handsontable/angular';
import { DataTablesModule } from "angular-datatables";
import * as $ from 'jquery';
import { CookieModule } from 'ngx-cookie';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { AppMainComponent } from './Components/app-main/app-main.component';
import { ContentWrapperComponent } from './Components/content-wrapper/content-wrapper.component';
import { AppRegistrationComponent } from './Components/app-registration/app-registration.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ContentHeaderComponent } from './Components/content-header/content-header.component';
import { NavComponent } from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MainSidbarComponent } from './Components/main-sidbar/main-sidbar.component';
import { ControlSidbarComponent } from './Components/control-sidbar/control-sidbar.component';
import { MyLeavesComponent } from './components/Leaves/my-leaves/my-leaves.component';
import { RequestLeavesComponent } from './components/Leaves/request-leaves/request-leaves.component';
import { ReviewLeavesComponent } from './components/Leaves/review-leaves/review-leaves.component';
import { ApproveLeavesComponent } from './components/Leaves/approve-leaves/approve-leaves.component';
import { MyErrandsComponent } from './components/Errands/my-errands/my-errands.component';
import { RequestErrandsComponent } from './components/Errands/request-errands/request-errands.component';
import { ReviewErrandsComponent } from './components/Errands/review-errands/review-errands.component';
import { ApproveErrandsComponent } from './components/Errands/approve-errands/approve-errands.component';
import { ApprovePermissionComponent } from './components/Permission/approve-permission/approve-permission.component';
import { MyPermissionComponent } from './components/Permission/my-permission/my-permission.component';
import { RequestPermissionComponent } from './components/Permission/request-permission/request-permission.component';
import { ReviewPermissionComponent } from './components/Permission/review-permission/review-permission.component';
import { ReviewComplaintsComponent } from './components/Complaints/review-complaints/review-complaints.component';
import { MyComplaintsComponent } from './components/Complaints/my-complaints/my-complaints.component';
import { RequestComplaintsComponent } from './components/Complaints/request-complaints/request-complaints.component';
import { SolvingComplaintsComponent } from './components/Complaints/solving-complaints/solving-complaints.component';
import { MySwapComponent } from './components/Swap/my-swap/my-swap.component';
import { RequestSwapComponent } from './components/swap/request-swap/request-swap.component';
import { IncomingSwapComponent } from './components/Swap/incoming-swap/incoming-swap.component';
import { ApproveSwapComponent } from './components/Swap/approve-swap/approve-swap.component';
import { AddEmployeeComponent } from './components/Employees/add-employee/add-employee.component';
import { ViewEmployeesComponent } from './components/Employees/view-employees/view-employees.component';
import { EditEmployeeComponent } from './components/Employees/edit-employee/edit-employee.component';
import { ProfileComponent } from './components/Employees/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninRedirectCallbackComponent } from './components/login/signin-redirect-callback/signin-redirect-callback.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignoutRedirectCallbackComponent } from './components/login/signout-redirect-callback/signout-redirect-callback.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AppConfigServiceService } from './Services/app-config-service.service';
//import { AuthService } from './Services/auth.service';
import { DecisionPipe } from './Services/decision.pipe';
import { ActionsComponent } from './components/Actions/actions/actions.component';
import { CancelComponent } from './components/Actions/cancel/cancel.component';
import { MainComponent } from './components/KPI/main/main.component';
import { ViewComponent } from './components/KPI/view/view.component';
import { AddEntryComponent } from './Components/Add-Entry/add-entry.component';
import { QRCodeModule } from 'angularx-qrcode';
import { BingMapComponent } from './components/bing-map/bing-map.component';
import { DriverTrackComponent } from './components/driver-track/driver-track.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { CarOwnerComponent } from './Components/CarOwner/carOwner.component';
import { AddCarOwnerComponent } from './Components/CarOwner/addCarOwner/addCarOwner.component';
import { CarComponent } from './Components/Car/car.component';
import { AddCarComponent } from './Components/Car/addCar/addCar.component';
import { SearchFilterPipe } from './Services/searchFilter.pipe';
import { AddDriverComponent } from './components/Drivers/add-driver/add-driver.component';
import { ViewDriversComponent } from './components/Drivers/view-drivers/view-drivers.component';
import { EditDriverComponent } from './components/Drivers/edit-driver/edit-driver.component';
import { ProfileDriverComponent } from './components/Drivers/profile-driver/profile-driver.component';
import { ViewEntriesComponent } from './Components/entries/view-entries/view-entries.component';


const appInitializerFn = (appConfig: AppConfigServiceService) => {
  return () => {
    return appConfig.loadAppConfig();
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    AppMainComponent,
    ContentWrapperComponent,
    AppRegistrationComponent,
    ForgetPasswordComponent,
    ContentHeaderComponent,
    NavComponent,
    FooterComponent,
    MainSidbarComponent,
    ControlSidbarComponent,
    MyLeavesComponent,
    RequestLeavesComponent,
    ReviewLeavesComponent,
    ApproveLeavesComponent,
    MyErrandsComponent,
    RequestErrandsComponent,
    ReviewErrandsComponent,
    ApproveErrandsComponent,
    ApprovePermissionComponent,
    MyPermissionComponent,
    RequestPermissionComponent,
    ReviewPermissionComponent,
    ReviewComplaintsComponent,
    MyComplaintsComponent,
    RequestComplaintsComponent,
    SolvingComplaintsComponent,
    MySwapComponent,
    IncomingSwapComponent,
    ApproveSwapComponent,
    AddEmployeeComponent,
    ViewEmployeesComponent,
    EditEmployeeComponent,
    ProfileComponent,
    SigninRedirectCallbackComponent,
    NotFoundComponent,
    SignoutRedirectCallbackComponent,
    ClaimsComponent,
    UnauthorizedComponent,
    //AuthInterceptorService
    DecisionPipe,
    RequestSwapComponent,
    ActionsComponent,
    CancelComponent,
    MainComponent,
    ViewComponent,
    AddEntryComponent,
    BingMapComponent,
    DriverTrackComponent,
    UnderConstructionComponent,
    CarOwnerComponent,
    AddCarOwnerComponent,
    CarComponent,
    AddCarComponent,
    SearchFilterPipe,
    AddDriverComponent,
    ViewDriversComponent,
    EditDriverComponent,
    ProfileDriverComponent,
    ViewEntriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HotTableModule,
    DataTablesModule,
    HttpClientModule,
    NgbModule,
    QRCodeModule
  ],
  providers: [
    //AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    AppConfigServiceService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigServiceService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
