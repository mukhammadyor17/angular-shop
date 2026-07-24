import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the default title ("404") when no @Input is provided', () => {
    fixture.detectChanges();
    const code = (fixture.nativeElement as HTMLElement).querySelector('.not-found-page__code');

    expect(code?.textContent?.trim()).toBe('404');
  });

  it('should update the rendered title when @Input changes', () => {
    component.title = '500';
    fixture.detectChanges();

    const code = (fixture.nativeElement as HTMLElement).querySelector('.not-found-page__code');
    expect(code?.textContent?.trim()).toBe('500');
  });

  it('should render a "Back to home" link pointing to the root route', () => {
    fixture.detectChanges();
    const link = (fixture.nativeElement as HTMLElement).querySelector('a.btn.btn-primary');

    expect(link?.getAttribute('routerLink')).toBe('/');
    expect(link?.textContent?.trim()).toBe('Back to home');
  });
});