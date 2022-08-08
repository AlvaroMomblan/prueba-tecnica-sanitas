import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should init LoginComponent and loginForm', () => {
    expect(component).toBeDefined();
    expect(component.loginForm).toBeDefined();
  });

  it('should set emailValid to true if email input has a valid a value', () => {
    component.loginForm.get('email').setValue('mock@gmail.com');
    component.onSubmit();
    expect(component.emailValid).toBeTrue();
  });

  it('should set emailValid to false if email input does not have a valid a value', () => {
    component.loginForm.get('email').setValue('mockgmail.com');
    component.onSubmit();
    expect(component.emailValid).toBeFalse();
  });

  it('should set emailValid to false if email input is empty', () => {
    component.onSubmit();
    expect(component.emailValid).toBeFalse();
  });

  it('should set passwordValid to true if password input has at least 5 characters', () => {
    component.loginForm.get('password').setValue('mockpassword');
    component.onSubmit();
    expect(component.passwordValid).toBeTrue();
  });

  it('should set passwordValid to false if password input has less than 5 characters', () => {
    component.loginForm.get('password').setValue('mock');
    component.onSubmit();
    expect(component.passwordValid).toBeFalse();
  });

  it('should set passwordValid to false if password input is empty', () => {
    component.onSubmit();
    expect(component.emailValid).toBeFalse();
  });

  it('should print "OK" on console if both inputs are valid', () => {
    spyOn(console, 'log');
    component.loginForm.get('email').setValue('mock@gmail.com');
    component.loginForm.get('password').setValue('mockpassword');
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('OK');
  });

  it('should not print any message on console if email input is invalid', () => {
    spyOn(console, 'log');
    component.loginForm.get('email').setValue('mockgmail.com');
    component.loginForm.get('password').setValue('mockpassword');
    component.onSubmit();
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should no print any message on console if password input is invalid', () => {
    spyOn(console, 'log');
    component.loginForm.get('email').setValue('mock@gmail.com');
    component.loginForm.get('password').setValue('mock');
    component.onSubmit();
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should set defaultLanguage to "es"', () => {
    expect(component.translate.defaultLang).toBe('es');
  });

  it('shoud correctly change languages', () => {
    spyOn(component.translate, 'use');
    component.onLanguageChange({ target: { value: 'en' } });
    expect(component.translate.use).toHaveBeenCalledWith('en');
    component.onLanguageChange({ target: { value: 'es' } });
    expect(component.translate.use).toHaveBeenCalledWith('es');
  });
});
