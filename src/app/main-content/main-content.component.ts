import { Component } from '@angular/core';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { AboutMeComponent } from "./about-me/about-me.component";
import { SkillsComponent } from "./skills/skills.component";
import { PortfolioSectionComponent } from "./portfolio-section/portfolio-section.component";
import { ContactSectionComponent } from "./contact-section/contact-section.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [LandingPageComponent, AboutMeComponent, SkillsComponent, PortfolioSectionComponent, ContactSectionComponent, HttpClientModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
