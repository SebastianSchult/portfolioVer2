import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
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

  onHoverContinous() {
    this.isHoveringContinous = true;
  }

  onLeaveContinous() {
    this.isHoveringContinous = false;
  }
}