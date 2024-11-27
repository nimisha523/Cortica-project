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
import { CoreService } from '../../../core/core.service';
import { Course, CourseMasterService } from '../../../Service/course-master.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StudentDataService } from '../../../Service/student-data.service';
import moment from 'moment';





@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatInputModule,MatButtonModule,MatToolbar,MatFormFieldModule,MatSelectModule,MatDialogModule,MatSnackBarModule,MatDatepickerModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent implements OnInit{

  studentForm:FormGroup;
  courses:Course[]=[];

  constructor(
    private fb:FormBuilder , 
    private dialogRef: MatDialogRef<AddStudentComponent>,
    private coursemasterService:CourseMasterService,
    private studentdataService:StudentDataService,
    private coreService:CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.studentForm = this.fb.group({
      s_firstName: ['', [ Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z]*$'),
        Validators.minLength(2),
        Validators.maxLength(30)]],
      s_lastName: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z]*$'),
        Validators.minLength(2),
        Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      education:['', [Validators.required]],
      collage:['', [Validators.required]],
      course:['', [Validators.required]],
      joinDate: ['', [Validators.required]],
      endDate:['', [Validators.required]],
      paidFees:['', [Validators.required]],
      remainingFees:['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.studentForm.patchValue(this.data);
    }
    this.coursemasterService.getCourseList().
        subscribe(courses => {
          this.courses = courses;
        });       
  }

  onFormSubmit(){
    if(this.studentForm.valid){
      //debugger
      const formValue = { ...this.studentForm.value };
      //Join date
      var tempJoinDate = new Date(formValue.joinDate);
      tempJoinDate.setDate(tempJoinDate.getDate() + 1);
      formValue.joinDate = tempJoinDate;

      //End date
      var tempEndDate = new Date(formValue.endDate);
      tempEndDate.setDate(tempEndDate.getDate() + 1);
      formValue.endDate = tempEndDate;
      // formValue.endDate = moment(formValue.endDate).format('YYYY-MM-DD');

      if(this.data){
        this.studentdataService.updateStudent(this.data.id, formValue).
        subscribe({
           next:(val:any) => {
            //  alert('User detailed updated');
             this.coreService.openSnackBar('Student detailed updated');
             this.dialogRef.close(true);
          },
          error: (err:any) => {
              console.log(err);
          }
        });
      }else{
        this.studentdataService.addStudent(formValue).
        subscribe({
           next:(val:any) => {
            //  alert('User added successfully...');
             this.coreService.openSnackBar('Student added successfully...');
             console.log(val);
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

