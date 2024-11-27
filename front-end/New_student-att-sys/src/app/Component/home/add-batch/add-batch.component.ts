import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { BatchMasterService } from '../../../Service/batch-master.service';
import { CoreService } from '../../../core/core.service';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { Course,CourseMasterService } from '../../../Service/course-master.service';
import { Trainer, UserMasterService } from '../../../Service/user-master.service';

@Component({
  selector: 'app-add-batch',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatInputModule,MatButtonModule,MatToolbar,MatFormFieldModule,MatSelectModule,MatDialogModule,MatSnackBarModule,MatDatepickerModule],
  templateUrl: './add-batch.component.html',
  styleUrl: './add-batch.component.css'
})
export class AddBatchComponent implements OnInit{
  batchForm:FormGroup;

  courses:Course[]=[];
  Trainers:Trainer[]=[];


  constructor(
    private fb:FormBuilder , 
    private batchmasterService:BatchMasterService, 
    private coursemasterService:CourseMasterService,
    private usermasterService:UserMasterService,
    private dialogRef: MatDialogRef<AddBatchComponent>,
    private coreService:CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.batchForm = this.fb.group({
      name: ['', [ Validators.required,
        Validators.pattern('^[a-zA-Z]+[0-9]*(\\.[0-9]+)?$'),
        Validators.minLength(2),
        Validators.maxLength(30)]],
      trainer: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z]*$'),
        Validators.minLength(2),
        Validators.maxLength(30)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      course: ['', [Validators.required]],
      
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.batchForm.patchValue(this.data);
    }
        this.coursemasterService.getCourseList().
        subscribe(courses => {
          this.courses = courses;
        }) ,
        this.usermasterService.getUserList().
        subscribe(trainers => {
          this.Trainers = trainers;
        });
        
  }
  onFormSubmit(){
    if(this.batchForm.valid){
      const formValue = { ...this.batchForm.value };
      //Join date
      var tempJoinDate = new Date(formValue.startDate);
      tempJoinDate.setDate(tempJoinDate.getDate() + 1);
      formValue.startDate = tempJoinDate;

      //End date
      var tempEndDate = new Date(formValue.endDate);
      tempEndDate.setDate(tempEndDate.getDate() + 1);
      formValue.endDate = tempEndDate;


      if(this.data){
        this.batchmasterService.updateBatch(this.data.id, formValue).
        subscribe({
           next:(val:any) => {
            //  alert('User detailed updated');
             this.coreService.openSnackBar('Batch detailed updated');
             this.dialogRef.close(true);
          },
          error: (err:any) => {
              console.log(err);
          }
        });
      }else{
        this.batchmasterService.addBatch(formValue).
        subscribe({
           next:(val:any) => {
            //  alert('User added successfully...');
             this.coreService.openSnackBar('Batch added successfully...');
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


