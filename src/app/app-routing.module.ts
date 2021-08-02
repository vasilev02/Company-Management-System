import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { AboutUserComponent } from './about-user/about-user.component';
import { WorkersComponent } from './workers/workers.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RoleComponent } from './role/role.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { AuthGuard } from './services/auth.guard';
import { TaskComponent } from './task/task.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AfterLoginGuard } from './services/after-login.guard';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AfterLoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AfterLoginGuard] },
  { path: 'about', component: AboutComponent},
  { path: 'worker/:id', component: AboutUserComponent, canActivate: [AuthGuard] },
  { path: 'personal-information/:id', component: AboutMeComponent, canActivate: [AuthGuard] },
  { path: 'update-user/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
  { path: 'workers', component: WorkersComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RoleComponent, canActivate: [AuthGuard] },
  { path: 'add-task', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
