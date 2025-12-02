import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegistrationFormModel} from '../model/auth.model';
import {CustomValidator} from '../../../validators/custom.validator';
import {AuthService} from '../../../core/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'cms-register',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  protected registerForm: FormGroup<RegistrationFormModel>;
  protected profilePreview: string | null = null;
  private authService: AuthService = inject(AuthService);
  protected isLoading: boolean = false;
  private router: Router = inject(Router);

  constructor() {
    this.registerForm = new FormGroup<RegistrationFormModel>({
        firstname: new FormControl<string | null>('', [
          Validators.required,
          Validators.minLength(3),
          CustomValidator.spaceValidator
        ]),
        lastname: new FormControl<string | null>('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidator.spaceValidator
        ]),
        username: new FormControl<string | null>('', [
            Validators.required,
            CustomValidator.usernameValidator
          ],
          [CustomValidator.usernameValidatorAsync(this.authService)]
        ),
        email: new FormControl<string | null>('',
          [
            Validators.required,
            Validators.email
          ],
          [CustomValidator.emailValidatorAsync(this.authService)]),
        bio: new FormControl<string | null>(null),
        phone: new FormControl<string | null>('', [Validators.required]),
        profile: new FormControl<File | null>(null),
        password: new FormControl<string | null>(null, [
          Validators.required,
          Validators.minLength(8),
          CustomValidator.passwordValidator,
          CustomValidator.spaceValidator
        ]),
        confirmPassword: new FormControl<string | null>(null, [
          Validators.required
        ])
      },
      {
        validators: CustomValidator.passwordMatchValidator, // <-- form-level validator
      });
  }


  onProfileSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Update form control
    this.registerForm.patchValue({profile: file});
    this.registerForm.get('profile')?.updateValueAndValidity();

    // Load preview
    const reader = new FileReader();
    reader.onload = () => this.profilePreview = reader.result as string;
    reader.readAsDataURL(file);
  }

  protected onSubmit = () => {
    this.isLoading = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }
    const formData = this.convertToFormData(this.registerForm);

    this.authService.register(formData).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
      complete: () => {
        this.isLoading = false;
        this.registerForm.reset();
        this.router.navigate(['/auth/login'])
      }
    });
  }


  protected get firstname(): AbstractControl<string | null> {
    return this.registerForm.get('firstname') as AbstractControl<string | null>;
  }

  protected get lastname(): AbstractControl<string | null> {
    return this.registerForm.get('lastname') as AbstractControl<string | null>;
  }

  protected get username(): AbstractControl<string | null> {
    return this.registerForm.get('username') as AbstractControl<string | null>;
  }

  protected get email(): AbstractControl<string | null> {
    return this.registerForm.get('email') as AbstractControl<string | null>;
  }

  protected get bio(): AbstractControl<string | null> {
    return this.registerForm.get('bio') as AbstractControl<string | null>;
  }

  protected get phone(): AbstractControl<string | null> {
    return this.registerForm.get('phone') as AbstractControl<string | null>;
  }

  protected get password(): AbstractControl<string | null> {
    return this.registerForm.get('password') as AbstractControl<string | null>;
  }

  protected get confirmPassword(): AbstractControl<string | null> {
    return this.registerForm.get('confirmPassword') as AbstractControl<string | null>;
  }

  private convertToFormData(form: FormGroup): FormData {
    const formData = new FormData();

    Object.keys(form.controls).forEach(key => {
      const value = form.get(key)?.value;

      // If it's a file, append as file
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else {
        // Append other fields as simple values
        formData.append(key, value ?? '');
      }
    });

    return formData;
  }


}
