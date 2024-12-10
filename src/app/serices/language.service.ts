import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = 'en';

  constructor(private translate: TranslateService) {}

  /**
   * Change the language of the application.
   * @param language The language to change to. English = 'en', German = 'de'.
   */
  changeLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
  }
}
