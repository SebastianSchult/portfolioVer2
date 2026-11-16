import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent {

  showResponsiveMenu = false;

  @ViewChild('burgerBtn') burgerBtn?: ElementRef<HTMLButtonElement>;
  @ViewChild('firstMenuLink') firstMenuLink?: ElementRef<HTMLAnchorElement>;

  constructor(public languageService: LanguageService){}

  /**
   * Toggles the mobile menu and moves focus into it (role="dialog",
   * aria-modal="true" implies a focus trap on open and focus return on close).
   */
  openResponsiveMenu() {
    this.showResponsiveMenu = !this.showResponsiveMenu;
    if (this.showResponsiveMenu) {
      setTimeout(() => this.firstMenuLink?.nativeElement.focus());
    }
  }

  closeResponsiveMenu(){
    this.showResponsiveMenu = false;
    this.burgerBtn?.nativeElement.focus();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showResponsiveMenu) {
      this.closeResponsiveMenu();
    }
  }

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }

}


