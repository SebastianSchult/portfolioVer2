import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../serices/language.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent {

  showResponsiveMenu = false;

  constructor(public languageService: LanguageService){}

  openResponsiveMenu() {
    this.showResponsiveMenu = !this.showResponsiveMenu;
  }
  
  closeResponsiveMenu(){
    this.showResponsiveMenu = false;
  
  }

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }

}


