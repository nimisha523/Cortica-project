import { Component, computed, signal } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarComponent } from '../home/side-bar/side-bar.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule,RouterOutlet,SideBarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  collapsed = signal(false);

  sidenavwidth = computed(()=> this.collapsed() ? '65px' : '250px')
}


