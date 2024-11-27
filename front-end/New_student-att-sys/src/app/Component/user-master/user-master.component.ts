import { CommonModule } from '@angular/common';
import { Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
// import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AddUserComponent } from '../home/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog'
import { UserMasterService } from '../../Service/user-master.service';
import { MatTableModule } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreService } from '../../core/core.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-user-master',
  standalone: true,
  imports: [FormsModule, CommonModule,MatPaginator,MatSort,MatInputModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,MatToolbar,MatIconModule,MatTableModule,MatSnackBarModule,MatSlideToggleModule],
  templateUrl: './user-master.component.html',
  styleUrl: './user-master.component.css'
})
export class UserMasterComponent implements OnInit{

  // switchbtn:any;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'address',
    'phoneNo',
    'email',
    'subject',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog,private usermasterService:UserMasterService,private coreService:CoreService){}

  ngOnInit(): void {
      this.getUserList();
  }

  openAddEditUserForm(){
    const dialogRef =  this._dialog.open(AddUserComponent);  
    dialogRef.afterClosed().
    subscribe({
      next: (val)=>{
       if(val){
        this.getUserList();
       }
      },
    });
  }

  getUserList(){
    this.usermasterService.getUserList().
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

  deleteUser(id:number){
    this.usermasterService.deleteUser(id).
    subscribe({
      next: (res)=>{
        // alert('User deleted!');
        this.coreService.openSnackBar('User deleted!','done');
        this.getUserList();
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
   const dialogRef = this._dialog.open(AddUserComponent,{
      data: data,
    });

    dialogRef.afterClosed().
    subscribe({
      next: (val)=>{
       if(val){
        this.getUserList();
       }
      },
    });
  }
}
