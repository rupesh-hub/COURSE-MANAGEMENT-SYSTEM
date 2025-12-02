import {
  AbstractControl,
  FormArray,
  FormGroup,
  type ValidationErrors,
  type ValidatorFn,
} from '@angular/forms';

export class FormUtils {
  static matchPassword(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;

      if (password && confirmPassword && password !== confirmPassword) {
        group.get('confirmPassword')?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        const errors = group.get('confirmPassword')?.errors;
        if (errors) {
          delete errors['passwordMismatch'];
          if (Object.keys(errors).length === 0) {
            group.get('confirmPassword')?.setErrors(null);
          }
        }
      }
      return null;
    };
  }

  static getErrorMessage(control: AbstractControl | null): string {
    if (!control || !control.errors) {
      return '';
    }

    const errors = control.errors;

    if (errors['required']) {
      return 'This field is required';
    }

    if (errors['minlength']) {
      return `Minimum length is ${errors['minlength'].requiredLength}`;
    }

    if (errors['maxlength']) {
      return `Maximum length is ${errors['maxlength'].requiredLength}`;
    }

    if (errors['email']) {
      return 'Invalid email address';
    }

    if (errors['pattern']) {
      return 'Invalid format';
    }

    if (errors['passwordMismatch']) {
      return 'Passwords do not match';
    }

    if (errors['usernameExists']) {
      return 'Username already exists';
    }

    if (errors['emailExists']) {
      return 'Email already exists';
    }

    return 'Invalid field';
  }

  static markFormGroupAsTouched(control: AbstractControl): void {
    if (control instanceof FormGroup) {
      Object.values(control.controls).forEach((childControl) => {
        childControl.markAsTouched();
        this.markFormGroupAsTouched(childControl);
      });
    }

    if (control instanceof FormArray) {
      control.controls.forEach((childControl) => {
        childControl.markAsTouched();
        this.markFormGroupAsTouched(childControl);
      });
    }
  }

  static isFormValid(group: AbstractControl): boolean {
    return group.valid && group.touched;
  }
}
