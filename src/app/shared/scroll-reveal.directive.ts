import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

type RevealDirection = 'left' | 'right';

/**
 * Blendet das Host-Element beim ersten Scrollen in den Viewport einmalig ein
 * (Fade + horizontaler Slide aus der angegebenen Richtung).
 *
 * Verwendung: <app-about-me appScrollReveal="left"></app-about-me>
 *
 * Respektiert `prefers-reduced-motion`: dann sofort sichtbar, ohne Bewegung.
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  @Input('appScrollReveal') direction: RevealDirection = 'left';

  private observer?: IntersectionObserver;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // Basiszustand (versteckt + Richtung) setzen.
    this.renderer.addClass(host, 'reveal');
    this.renderer.addClass(host, `reveal--${this.direction}`);

    // Kein IntersectionObserver verfuegbar oder reduzierte Bewegung gewuenscht:
    // sofort einblenden, keine Animation aufbauen.
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(host, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(host, 'is-visible');
            observer.unobserve(entry.target); // einmalig
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
