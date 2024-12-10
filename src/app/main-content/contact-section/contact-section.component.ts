import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LanguageService } from '../../serices/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule, RouterLink],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  constructor(public languageService: LanguageService) {}

  /**
   * Changes the language of the application.
   * @param language The language to change to. English = 'en', German = 'de'.
   */
  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  http = inject(HttpClient);

  privacyPolicyChecked: boolean = false;

  mailTest = false;
  isButtonSuccess: boolean = false;

  post = {
    endPoint: 'https://sebastian-schult-dev.de/sendMail.php',

    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  /**
   * Handle the contact form submission.
   * @param ngForm The NgForm instance.
   */
  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.isButtonSuccess = true;
            setTimeout(() => {
              this.isButtonSuccess = false;
            }, 2000);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    }
  }
}
