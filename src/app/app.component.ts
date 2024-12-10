import { Component, inject, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './serices/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent, TranslateModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  currentLanguage: string = 'en';
  title = 'portfolio2';

/**
 * Initializes a new instance of the AppComponent class.
 * @param languageService - The service used for managing language translations.
 */

  constructor (
    private languageService: LanguageService
  ){
  
  }

  /**
   * Static method for changing the language of the application.
   * @param language The language to change to. English = 'en', German = 'de'.
   * @param translateService The TranslateService instance.
   */
  static changeLanguageStatic(language: string, translateService: TranslateService) {
    translateService.use(language);
  }


 
}

