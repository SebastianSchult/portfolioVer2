import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageService } from '../../serices/language.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  isVisible = true;
  isHoveringContinous = false;

  skills = [
    { src: 'assets/img/skills/html.png' , description: 'HTML' },
    { src: 'assets/img/skills/css.png' , description: 'CSS' },
    { src: 'assets/img/skills/javascript.png' , description: 'Javascript' },
    { src: 'assets/img/skills/typescript.png' , description: 'Typescript' },
    { src: 'assets/img/skills/angular.png' , description: 'Angular' },
    { src: 'assets/img/skills/firebase.png' , description: 'Firebase' },
    { src: 'assets/img/skills/git.png' , description: 'Git' },
    { src: 'assets/img/skills/api.svg' , description: 'Rest-API' },
    { src: 'assets/img/skills/scrum.png' , description: 'Scrum' },
    { src: 'assets/img/skills/materialDesign.png' , description: 'Material Design' },

    
    

  ];

  /**
   * When the mouse hovers over the 'Continually learning' skill element, this function sets the flag to show the hover state.
   */
  onHoverContinous() {
    this.isHoveringContinous = true;
  }

  /**
   * When the mouse leaves the 'Continually learning' skill element, this function sets the flag to not show the hover state.
   */
  onLeaveContinous() {
    this.isHoveringContinous = false;
  }

  constructor(public languageService: LanguageService){}

  /**
   * Change the language of the application.
   * @param language The language to change to. English = 'en', German = 'de'.
   */
  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }
}