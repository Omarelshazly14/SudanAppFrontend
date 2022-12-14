import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppMainComponent } from './Components/app-main/app-main.component';
import { AppRegistrationComponent } from './Components/app-registration/app-registration.component';
import { ClaimsComponent } from './Components/claims/claims.component';
import { MyComplaintsComponent } from './components/Complaints/my-complaints/my-complaints.component';
import { RequestComplaintsComponent } from './components/Complaints/request-complaints/request-complaints.component';
import { ReviewComplaintsComponent } from './components/Complaints/review-complaints/review-complaints.component';
import { SolvingComplaintsComponent } from './components/Complaints/solving-complaints/solving-complaints.component';
import { ContentWrapperComponent } from './Components/content-wrapper/content-wrapper.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { AddEmployeeComponent } from './components/Employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/Employees/edit-employee/edit-employee.component';
import { ProfileComponent } from './components/Employees/profile/profile.component';
import { ViewEmployeesComponent } from './components/Employees/view-employees/view-employees.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ApproveLeavesComponent } from './components/Leaves/approve-leaves/approve-leaves.component';
import { MyLeavesComponent } from './components/Leaves/my-leaves/my-leaves.component';
import { RequestLeavesComponent } from './components/Leaves/request-leaves/request-leaves.component';
import { ReviewLeavesComponent } from './components/Leaves/review-leaves/review-leaves.component';
import { ApproveErrandsComponent } from './components/Errands/approve-errands/approve-errands.component';
import { MyErrandsComponent } from './components/Errands/my-errands/my-errands.component';
import { RequestErrandsComponent } from './components/Errands/request-errands/request-errands.component';
import { ReviewErrandsComponent } from './components/Errands/review-errands/review-errands.component';
import { LoginComponent } from './Components/login/login.component';
import { SigninRedirectCallbackComponent } from './components/login/signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './components/login/signout-redirect-callback/signout-redirect-callback.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ApprovePermissionComponent } from './components/Permission/approve-permission/approve-permission.component';
import { MyPermissionComponent } from './components/Permission/my-permission/my-permission.component';
import { RequestPermissionComponent } from './components/Permission/request-permission/request-permission.component';
import { ReviewPermissionComponent } from './Components/Permission/review-permission/review-permission.component';
import { ApproveSwapComponent } from './components/Swap/approve-swap/approve-swap.component';
import { IncomingSwapComponent } from './components/Swap/incoming-swap/incoming-swap.component';
import { MySwapComponent } from './components/Swap/my-swap/my-swap.component';
import { RequestSwapComponent } from './components/swap/request-swap/request-swap.component';
import { ActionsComponent } from './components/Actions/actions/actions.component';
import { CancelComponent } from './components/Actions/cancel/cancel.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthGuardService } from './Services/guards/auth-guard.service';
import { MainComponent } from './components/KPI/main/main.component';
import { AddEntryComponent } from './Components/Add-Entry/add-entry.component';
import { DriverTrackComponent } from './components/driver-track/driver-track.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: AppMainComponent,
    children: [
      {
        path: '', component: ContentWrapperComponent,
        children: [
          { path: 'home', component: DashBoardComponent },
          { path: '', redirectTo: '/home', pathMatch: 'full' },
          { path: 'profile', component: ProfileComponent },
          { path: 'emp/view', component: ViewEmployeesComponent },
          { path: 'emp/0', component: AddEmployeeComponent },
          { path: 'emp/:id', component: EditEmployeeComponent },
          { path: 'leaves/me', component: MyLeavesComponent },
          { path: 'leaves/request', component: RequestLeavesComponent },
          { path: 'leaves/review', component: ReviewLeavesComponent },
          { path: 'leaves/approve', component: ApproveLeavesComponent },
          { path: 'errands/me', component: MyErrandsComponent },
          { path: 'errands/request', component: RequestErrandsComponent },
          { path: 'errands/review', component: ReviewErrandsComponent },
          { path: 'errands/approve', component: ApproveErrandsComponent },
          { path: 'permissions/me', component: MyPermissionComponent },
          { path: 'permissions/request', component: RequestPermissionComponent },
          { path: 'permissions/review', component: ReviewPermissionComponent },
          { path: 'permissions/approve', component: ApprovePermissionComponent },
          { path: 'swap/me', component: MySwapComponent },
          { path: 'swap/request', component: RequestSwapComponent },
          { path: 'swap/incoming', component: IncomingSwapComponent },
          { path: 'swap/approve', component: ApproveSwapComponent },
          { path: 'complaints/me', component: MyComplaintsComponent },
          { path: 'complaints/request', component: RequestComplaintsComponent },
          { path: 'complaints/review', component: ReviewComplaintsComponent },
          { path: 'complaints/solving', component: SolvingComplaintsComponent },
          { path: 'performance/kpi/eval', component: MainComponent },
          { path: 'performance/kpi/confirm', component: DashBoardComponent },
          { path: 'performance/kpi/approve', component: DashBoardComponent },
          { path: 'performance/quiz/eval', component: DashBoardComponent },
          { path: 'performance/quiz/confirm', component: DashBoardComponent },
          { path: 'performance/quiz/approve', component: DashBoardComponent },
          { path: 'qc/eval', component: DashBoardComponent },
          { path: 'qc/confirm', component: DashBoardComponent },
          { path: 'qc/approve', component: DashBoardComponent },
          { path: 'actions', component: ActionsComponent },
          { path: 'actions/cancel', component: CancelComponent },
          { path: 'disciplinary/actions/request', component: DashBoardComponent },
          { path: 'disciplinary/actions/confirm', component: DashBoardComponent },
          { path: 'disciplinary/actions/approve', component: DashBoardComponent },
          { path: 'disciplinary/cancel/request', component: DashBoardComponent },
          { path: 'disciplinary/cancel/approve', component: DashBoardComponent },
          { path: 'disciplinary/investg/request', component: DashBoardComponent },
          { path: 'disciplinary/investg/approve', component: DashBoardComponent },
          { path: 'disciplinary/investg/happrove', component: DashBoardComponent },
          { path: 'disciplinary/grvncomt/caller', component: DashBoardComponent },
          { path: 'disciplinary/grvncomt/deci', component: DashBoardComponent },
          { path: 'disciplinary/terminate/request', component: DashBoardComponent },
          { path: 'disciplinary/terminate/approve', component: DashBoardComponent },
          { path: 'resign/resign/request', component: DashBoardComponent },
          { path: 'resign/resign/review', component: DashBoardComponent },
          { path: 'resign/resign/approve', component: DashBoardComponent },
          { path: 'resign/proresign/request', component: DashBoardComponent },
          { path: 'resign/proresign/review', component: DashBoardComponent },
          { path: 'resign/proresign/approve', component: DashBoardComponent },
          { path: 'end/request', component: DashBoardComponent },
          { path: 'end/approve', component: DashBoardComponent },
          { path: 'end/confirm', component: DashBoardComponent },
          { path: 'attendance/request', component: DashBoardComponent },
          { path: 'attendance/approve', component: DashBoardComponent },
          { path: 'attendance/confirm', component: DashBoardComponent },
          { path: 'claims', component: ClaimsComponent, canActivate: [AuthGuardService] },
          { path: 'unauthorized', component: UnauthorizedComponent },
          { path: 'addEntry', component: AddEntryComponent },
          { path: 'driversTracking', component: DriverTrackComponent },
          { path: 'underconstruction', component: UnderConstructionComponent },
        ]
      },
    ]
  },
  {
    path: '', component: AppRegistrationComponent,
    children: [
      { path: 'signin-callback', component: SigninRedirectCallbackComponent },
      { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
      { path: 'login', component: LoginComponent },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/404', pathMatch: 'full' },
      { path: 'forget-password', component: ForgetPasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
