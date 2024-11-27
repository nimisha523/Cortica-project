import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { CourseMasterService } from '../../../Service/course-master.service';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatInputModule,MatButtonModule,MatToolbar,MatFormFieldModule,MatSelectModule,MatDialogModule,MatSnackBarModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  courseForm:FormGroup;


  constructor(
    private fb:FormBuilder , 
    private courseMasterService:CourseMasterService, 
    private dialogRef: MatDialogRef<AddCourseComponent>,
    private coreService:CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.courseForm = this.fb.group({
      name: ['', [ Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)]],
        description: ['', [Validators.required]],
        fees: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.courseForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.courseForm.valid) {
      if (this.data) {
        this.courseMasterService.updateCourse(this.data.id, this.courseForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Course details updated');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      } else {
        this.courseMasterService.addCourse(this.courseForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Course added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
    }
  }
}
