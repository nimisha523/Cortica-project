import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../Service/admin.service';
import { ForgetPassComponent } from '../forget-pass/forget-pass.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ForgetPassComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:any="";
  password:any="";

  isValidEmail="admin@gmail.com";
  isValidPassword="admin";

  constructor(private router:Router,private adminService: AdminService){}

  OnLogin(){
    if(this.isValidEmail==this.email && this.isValidPassword== this.password)
      {
        this.adminService.Login(this.email);
        alert("login successful");
        this.router.navigate(['/main']);
        console.log("successfull...")
      }
      else{
        alert("Invalid Email or Password");
      }
  }

  forgetpass(){
    this.router.navigate(['/forget-pass'])
  }
}
