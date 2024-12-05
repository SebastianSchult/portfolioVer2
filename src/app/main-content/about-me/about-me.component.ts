import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../serices/language.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

  constructor(public languageService: LanguageService){}

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }
}
