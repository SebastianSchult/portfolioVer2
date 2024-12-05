import { Component } from '@angular/core';
import { LanguageService } from '../../serices/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio-section',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './portfolio-section.component.html',
  styleUrl: './portfolio-section.component.scss'
})
export class PortfolioSectionComponent {
  constructor(public languageService: LanguageService) {}

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }


}
