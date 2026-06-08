import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = 'de';

  /**
   * Constructs a LanguageService object.
   * @param translate The TranslateService instance.
   *                  This service is used to set the language of the application.
   * @param title The Title service used to update the document title (SEO).
   * @param meta The Meta service used to update SEO meta tags.
   * @param document The DOM document, used to update the <html lang> attribute.
   */
  constructor(
    private translate: TranslateService,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.loadLanguage();
  }


  /**
   * Change the language of the application.
   * @param language The language to change to. English = 'en', German = 'de'.
   */
  changeLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
    localStorage.setItem('appLanguage', language);
    this.applyLanguageSideEffects(language);
  }


  /**
   * Load the language from local storage.
   * If a language is saved, use this language.
   * If no language is saved, use the default language.
   */
  private loadLanguage() {
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      this.translate.use(savedLanguage);
    } else {
      this.translate.use(this.currentLanguage);
    }
    this.applyLanguageSideEffects(this.currentLanguage);
  }


  /**
   * Applies language-dependent side effects for SEO and accessibility:
   * updates the <html lang> attribute and the localized title/description meta tags.
   * @param language The active language ('en' | 'de').
   */
  private applyLanguageSideEffects(language: string) {
    this.document.documentElement.lang = language;

    this.translate
      .get(['SEO_TITLE', 'SEO_DESCRIPTION'])
      .subscribe((t) => {
        const seoTitle = t['SEO_TITLE'];
        const seoDescription = t['SEO_DESCRIPTION'];

        this.title.setTitle(seoTitle);
        this.meta.updateTag({ name: 'description', content: seoDescription });
        this.meta.updateTag({ property: 'og:title', content: seoTitle });
        this.meta.updateTag({ property: 'og:description', content: seoDescription });
        this.meta.updateTag({ name: 'twitter:title', content: seoTitle });
        this.meta.updateTag({ name: 'twitter:description', content: seoDescription });
        this.meta.updateTag({
          property: 'og:locale',
          content: language === 'de' ? 'de_DE' : 'en_US',
        });
      });
  }
}
