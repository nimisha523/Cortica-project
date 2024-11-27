import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CoreService } from '../../core/core.service';
import { CourseMasterService } from '../../Service/course-master.service';
import { AddCourseComponent } from '../home/add-course/add-course.component';

@Component({
  selector: 'app-course-master',
  standalone: true,
  imports: [FormsModule, CommonModule,MatPaginator,MatSort,MatInputModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,MatToolbar,MatIconModule,MatTableModule,MatSnackBarModule,MatSlideToggleModule,AddUserComponent],
  templateUrl: './course-master.component.html',
  styleUrl: './course-master.component.css'
})
export class CourseMasterComponent implements OnInit{

  displayedColumns: string[] = [
    'name',
    'description',
    'fees',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog,private coursemasterService:CourseMasterService,private coreService:CoreService,private fb :FormBuilder){}

  ngOnInit(): void {
      this.getCourseList();
        
  }

  openAddEditcourseForm(){
    const dialogRef =  this._dialog.open(AddCourseComponent);  
    dialogRef.afterClosed().
    subscribe({
      next: (val)=>{
       if(val){
        this.getCourseList();
       }
      },
    });
  }

  getCourseList(){
    this.coursemasterService.getCourseList().
      subscribe({
        next: (res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(res);
        },
        error: (err)=>{
          console.log(err);
        }
      })
  }

  deleteCourse(id:number){
    this.coursemasterService.deleteCourse(id).
    subscribe({
      next: (res)=>{
        // alert('User deleted!');
        this.coreService.openSnackBar('User deleted!','done');
        this.getCourseList();
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

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddCourseComponent, {
      data: data,
    });
  
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCourseList();
        }
      },
    });
  }

}

