import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailValid = true;
  passwordValid = true;

  languageOptions = [
    { textValue: this.translate.instant('language.es'), keyValue: 'es' },
    { textValue: this.translate.instant('language.en'), keyValue: 'en' },
  ];

  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.translate.setDefaultLang('es');
    this.translate.addLangs(['es', 'en']);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        remember: [false],
      },
      { updateOn: 'submit' }
    );
  }

  onLanguageChange(event: any) {
    this.translate.use(event.target.value);
    this.cdRef.detectChanges();
  }

  onSubmit() {
    this.validateForm();
    if (this.emailValid && this.passwordValid) {
      console.log('OK');
    }
  }

  private validateForm() {
    this.emailValid = this.loginForm.controls.email.valid;
    this.passwordValid = this.loginForm.controls.password.valid;
  }
}
