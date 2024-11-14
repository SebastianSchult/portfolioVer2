import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  showResponsiveMenu = false;

  openResponsiveMenu() {
    this.showResponsiveMenu = !this.showResponsiveMenu;
  }
  
  closeResponsiveMenu(){
    this.showResponsiveMenu = false;
  
  }

}


