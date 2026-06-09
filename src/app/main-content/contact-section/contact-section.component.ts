import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule, RouterLink, ReactiveFormsModule],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss'],
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
   * Validates the entered email address.
   * @param email The email address to validate.
   * @returns True if the email is valid, false otherwise.
   */
  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  /**
   * Handles the contact form submission.
   * @param ngForm The NgForm instance.
   */
  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      // Validierung vor dem Senden; ungueltige E-Mail bricht ab
      if (!this.isEmailValid(this.contactData.email)) {
        return;
      }

      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: () => {
            ngForm.resetForm();
            this.isButtonSuccess = true;
            setTimeout(() => {
              this.isButtonSuccess = false;
            }, 2000);
          },
        });
    }
  }
}