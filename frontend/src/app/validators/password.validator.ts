import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Directive} from '@angular/core';

@Directive({
  selector: "[cmsPasswordValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidator,
      multi: true
    }
  ],
  standalone: true
})
export class PasswordValidator implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null ;

    // Example: require at least 8 chars, 1 number, 1 uppercase
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const validLength = password.length >= 8;

    const isValid = hasNumber && hasUpper && validLength;

    return isValid ? null : {
      passwordStrength: {
        hasNumber,
        hasUpper,
        validLength
      }
    };
  }

}
