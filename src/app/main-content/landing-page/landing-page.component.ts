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

  /**
   * Change the language of the application.
   * @param language The language to change to. English = 'en', German = 'de'.
   */
  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }

  /**
   * Scrolls the page smoothly to the contact section of the webpage.
   * Utilizes the 'scrollIntoView' method to ensure smooth scrolling behavior.
   */

  scrollToContact() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
