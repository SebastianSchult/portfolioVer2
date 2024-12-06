import { Component } from '@angular/core';
import { LanguageService } from '../../serices/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, RouterLink, RouterOutlet],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(public languageService: LanguageService) {}

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }

}
