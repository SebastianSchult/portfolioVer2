import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  /** Aktuelles Jahr für die Copyright-Zeile, damit es nicht veraltet. */
  currentYear = new Date().getFullYear();

  constructor(public languageService: LanguageService) {}

/**
 * Change the language of the application.
 * @param language The language to change to. English = 'en', German = 'de'.
 */

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }

}
