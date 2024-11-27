import { Component, Input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


export type MenuItem ={
  icon: string;
  label: string;
  route?: string;
  // subItems?: MenuItem[];
};

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatListModule,MatIconModule,CommonModule,RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  //  item = input.required<MenuItem>();
  // @Input() item!: MenuItem;
  sideNavCollapsed = signal(false);

 @Input() set collapsed(val:boolean){
  this.sideNavCollapsed.set(val);
 }

//  nestedMenuOpen = signal(false);

//  toggleNested() {
//   if (!this.item.subItems) {
//     return;
//   } else {
//     this.nestedMenuOpen.set(!this.nestedMenuOpen());
//   }
// }

  menuItems = signal<MenuItem[]>([
    {
      icon:'dashboard',
      label:'Dashboard',
      route:'dashboard',
    },
    {
      icon:'person',
      label:'Trainers',
      route:'user-master',
    },
    {
      icon:'subject',
      label:'Course Master',
      route:'course-master',
      // subItems:[
      //   {
      //     icon:'subject',
      //     label:'Java',
      //     route:'java',
      //   },
      //   {
      //     icon:'subject',
      //     label:'Dot Net',
      //     route:'dotnet',
      //   },
      //   {
      //     icon:'subject',
      //     label:'Testing',
      //     route:'testing',
      //   },
      // ]
    },
    {
      icon:'class',
      label:'Batch Master',
      route:'batch-master',
    },
    {
      icon:'info',
      label:'Student Data',
      route:'student-data',
    },
    {
      icon:'download',
      label:'Reports',
      route:'attendence-reports',
    }
  ]);


}

