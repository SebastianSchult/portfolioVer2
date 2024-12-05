import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = 'en';

  constructor(private translate: TranslateService) {}

  changeLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
  }
}
