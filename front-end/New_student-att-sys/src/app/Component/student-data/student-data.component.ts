import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { AddUserComponent } from '../home/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { BatchMasterService } from '../../Service/batch-master.service';
import { CoreService } from '../../core/core.service';
import { AddStudentComponent } from '../home/add-student/add-student.component';
import { StudentDataService } from '../../Service/student-data.service';
import { StudentDetailsComponent } from '../student-details/student-details.component';

@Component({
  selector: 'app-student-data',
  standalone: true,
  imports: [FormsModule, CommonModule,MatPaginator,MatSort,MatInputModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,MatToolbar,MatIconModule,MatTableModule,MatSnackBarModule,MatSlideToggleModule,AddUserComponent],
  templateUrl: './student-data.component.html',
  styleUrl: './student-data.component.css'
})
export class StudentDataComponent implements OnInit{

  displayedColumns: string[] = [
    's_firstName',
    's_lastName',
    'email',
    'mobileNumber',
    'course',
    'joinDate',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog,private studentdataService:StudentDataService,private coreService:CoreService){}

  ngOnInit(): void {
      this.getStudentList();
  }

  openAddEditStudentForm(){
    const dialogRef =  this._dialog.open(AddStudentComponent);  
    dialogRef.afterClosed().
    subscribe({
      next: (val)=>{
       if(val){
        this.getStudentList();
       }
      },
    });
  }

  getStudentList(){
    this.studentdataService.getStudentList().
      subscribe({
        next: (res)=>{
  
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err)=>{
          console.log(err);
        }
      })
  }

  deleteStudent(id:number){
    this.studentdataService.deleteStudent(id).
    subscribe({
      next: (res)=>{
        // alert('User deleted!');
        this.coreService.openSnackBar('Student deleted!','done');
        this.getStudentList();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any){
   const dialogRef = this._dialog.open(AddStudentComponent,{
      data: data,
    });

    dialogRef.afterClosed().
    subscribe({
      next: (val)=>{
       if(val){
        this.getStudentList();
       }
      },
    });
  }

  viewStudentDetails(row: any) {
    this._dialog.open(StudentDetailsComponent, {
      data: row
    });
  }
}