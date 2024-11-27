import { Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { ForgetPassComponent } from './Component/forget-pass/forget-pass.component';
import { UserMasterComponent } from './Component/user-master/user-master.component';
import { NavBArComponent } from './Component/home/nav-bar/nav-bar.component';
import { MainComponent } from './Component/main/main.component';
import { CourseMasterComponent } from './Component/course-master/course-master.component';
import { BatchMasterComponent } from './Component/batch-master/batch-master.component';
import { AttendenceReportComponent } from './Component/attendence-report/attendence-report.component';
import { AddUserComponent } from './Component/home/add-user/add-user.component';
import { StudentDataComponent } from './Component/student-data/student-data.component';
import { StudentDetailsComponent } from './Component/student-details/student-details.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},

    {path:'main',component:MainComponent,
        children:[
            {path:'',redirectTo:'dashboard',pathMatch:'full'},
            {path:'dashboard',component:DashboardComponent},
            {path:'forget-pass',component:ForgetPassComponent},
            {path:'user-master',component:UserMasterComponent},
            {path:'add-user',component:AddUserComponent},
            {path:'nav-bar',component:NavBArComponent},
            {path:'course-master',component:CourseMasterComponent},
            {path:'batch-master',component:BatchMasterComponent},
            {path:'attendence-reports',component:AttendenceReportComponent},
            {path:'student-data',component:StudentDataComponent},
            {path:'student-details',component:StudentDetailsComponent}
        ]
    },
];

