import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarComponent } from '../side-bar/side-bar.component';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports:  [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule,SideBarComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBArComponent {

}
