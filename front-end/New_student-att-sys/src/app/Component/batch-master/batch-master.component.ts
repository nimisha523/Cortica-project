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
import { BatchMasterService } from '../../Service/batch-master.service';
import { AddBatchComponent } from '../home/add-batch/add-batch.component';

@Component({
  selector: 'app-batch-master',
  standalone: true,
  
  imports: [FormsModule, CommonModule,MatPaginator,MatSort,MatInputModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,MatToolbar,MatIconModule,MatTableModule,MatSnackBarModule,MatSlideToggleModule,AddUserComponent],
  templateUrl: './batch-master.component.html',
  styleUrl: './batch-master.component.css'
})
export class BatchMasterComponent implements OnInit{

  displayedColumns: string[] = [
    'name',
    'course',
    'trainer',
    'startDate',
    'endDate',
    'action',
    
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog,private batchmasterService:BatchMasterService,private coreService:CoreService,private fb :FormBuilder){}

  ngOnInit(): void {
    this.getBatchList();
}

openAddEditBatchForm(){
  const dialogRef =  this._dialog.open(AddBatchComponent);  
  dialogRef.afterClosed().
  subscribe({
    next: (val)=>{
     if(val){
      this.getBatchList();
     }
    },
  });
}

getBatchList(){
  this.batchmasterService.getBatchsList().
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

deleteBatch(id:number){
  this.batchmasterService.deleteBatch(id).
  subscribe({
    next: (res)=>{
      // alert('User deleted!');
      this.coreService.openSnackBar('Batch deleted!','done');
      this.getBatchList();
    },
    error: (err)=>{
      console.log(err);
    }
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

openEditForm(data: any){
 const dialogRef = this._dialog.open(AddBatchComponent,{
    data: data,
  });

  dialogRef.afterClosed().
  subscribe({
    next: (val)=>{
     if(val){
      this.getBatchList();
     }
    },
  });
}
}



