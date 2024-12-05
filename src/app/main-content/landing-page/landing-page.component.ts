import { Component } from '@angular/core';
import { LanguageService } from '../../serices/language.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  constructor(public languageService: LanguageService) {}

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }

  scrollToContact() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
