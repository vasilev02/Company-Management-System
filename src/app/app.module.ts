import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AboutUserComponent } from './about-user/about-user.component';
import { WorkersComponent } from './workers/workers.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UserService } from './services/user.service';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RoleComponent } from './role/role.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { TaskComponent } from './task/task.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { StatisticsComponent } from './statistics/statistics.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarComponent } from './calendar/calendar.component';

import {LottieModule} from 'ngx-lottie'
import player from 'lottie-web'

FullCalendarModule.registerPlugins([
  dayGridPlugin
]);

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutComponent,
    AboutUserComponent,
    WorkersComponent,
    NotFoundPageComponent,
    UpdateUserComponent,
    RoleComponent,
    AboutMeComponent,
    TaskComponent,
    StatisticsComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GoogleChartsModule,
    FullCalendarModule ,
    LottieModule.forRoot({ player: playerFactory }),
    ToastrModule.forRoot({
      progressBar:true,
      preventDuplicates:true
    })
  ],
  providers: [AuthService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
