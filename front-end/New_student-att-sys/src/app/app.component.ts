import { Component, computed, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { MainComponent } from './Component/main/main.component';
import { SideBarComponent } from './Component/home/side-bar/side-bar.component';
import { routes } from './app.routes';
import { UserMasterComponent } from './Component/user-master/user-master.component';
import { AddUserComponent } from './Component/home/add-user/add-user.component';
import { CourseMasterComponent } from './Component/course-master/course-master.component';
import { AddCourseComponent } from './Component/home/add-course/add-course.component';
import { StudentDataComponent } from './Component/student-data/student-data.component';
import { StudentDetailsComponent } from './Component/student-details/student-details.component';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav'
// import { SideBarComponent } from "./Component/home/side-bar/side-bar.component";
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './Component/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent,MainComponent,SideBarComponent,UserMasterComponent,AddUserComponent,CourseMasterComponent,AddCourseComponent,StudentDataComponent,StudentDetailsComponent,NgChartsModule,DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AttendenceSystem';

//   collapsed = signal(false);

//   sidenavwidth = computed(()=> this.collapsed() ? '65px' : '250px')
 }
