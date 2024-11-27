import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {  MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserMasterService } from '../../../Service/user-master.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreService } from '../../../core/core.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatInputModule,MatButtonModule,MatToolbar,MatFormFieldModule,MatSelectModule,MatDialogModule,MatSnackBarModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{

  userForm:FormGroup;

  user: string[]=[
    'Java',
    'DotNet',
    'Python',
    'Testing',
    'AWS'
  ]

  constructor(
    private fb:FormBuilder , 
    private usermasterService:UserMasterService, 
    private dialogRef: MatDialogRef<AddUserComponent>,
    private coreService:CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.userForm = this.fb.group({
      firstName: ['', [ Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z]*$'),
        Validators.minLength(2),
        Validators.maxLength(30)]],
      lastName: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z]*$'),
        Validators.minLength(2),
        Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
         
  }

  onFormSubmit(){
    if(this.userForm.valid){
      if(this.data){
        this.usermasterService.updateUser(this.data.id, this.userForm.value).
        subscribe({
           next:(val:any) => {
            //  alert('User detailed updated');
             this.coreService.openSnackBar('User detailed updated');
             this.dialogRef.close(true);
          },
          error: (err:any) => {
              console.log(err);
          }
        });
      }else{
        this.usermasterService.addUser(this.userForm.value).
        subscribe({
           next:(val:any) => {
            //  alert('User added successfully...');
            console.log(this.userForm.value);
             this.coreService.openSnackBar('User added successfully...');
             this.dialogRef.close(true);
          },
          error: (err:any) => {
              console.log(err);
          }
        });
      }      
    }
  }
}
