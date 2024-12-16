import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = 'en'; 

  /**
   * Constructs a LanguageService object.
   * @param translate The TranslateService instance.
   *                  This service is used to set the language of the application.
   */
  constructor(private translate: TranslateService) {
    this.loadLanguage(); 
  }

  
  /**
   * Change the language of the application.
   * @param language The language to change to. English = 'en', German = 'de'.
   */
  changeLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
    localStorage.setItem('appLanguage', language); 
  }

  
  /**
   * Load the language from local storage.
   * If a language is saved, use this language.
   * If no language is saved, use the default language.
   */
  private loadLanguage() {
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      this.translate.use(savedLanguage);
    } else {
      this.translate.use(this.currentLanguage);
    }
  }
}

